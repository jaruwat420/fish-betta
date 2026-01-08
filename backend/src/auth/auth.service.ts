import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.loggerService.logAuth('register', undefined, email, false, {
        reason: 'Email already exists',
      });
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with trial subscription
    const trialExpiresAt = new Date();
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 7); // 7 days trial

    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      isActive: true,
      subscription: {
        plan: 'trial',
        status: 'active',
        expiresAt: trialExpiresAt,
      },
    });

    await user.save();

    // Generate JWT token
    const token = this.generateToken(user);

    // Log successful registration
    this.loggerService.logAuth('register', user._id.toString(), email, true, {
      subscription: 'trial',
      expiresAt: trialExpiresAt,
    });

    this.loggerService.info(`New user registered: ${email}`, {
      userId: user._id.toString(),
      email,
      name,
    }, 'Auth');

    return {
      message: 'Registration successful',
      token,
      user: this.sanitizeUser(user),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.loggerService.logAuth('login', undefined, email, false, {
        reason: 'User not found',
      });
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      this.loggerService.logAuth('login', user._id.toString(), email, false, {
        reason: 'Account deactivated',
      });
      throw new UnauthorizedException('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.loggerService.logAuth('login', user._id.toString(), email, false, {
        reason: 'Invalid password',
      });
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check subscription status
    const now = new Date();
    let subscriptionStatus = user.subscription?.status || 'expired';

    if (user.subscription && user.subscription.expiresAt) {
      if (new Date(user.subscription.expiresAt) > now) {
        subscriptionStatus = 'active';
      } else {
        subscriptionStatus = 'expired';
      }
    }

    // Update last login and subscription status
    user.lastLoginAt = now;
    if (user.subscription) {
      user.subscription.status = subscriptionStatus;
    }
    await user.save();

    // Generate JWT token
    const token = this.generateToken(user);

    // Log successful login
    this.loggerService.logAuth('login', user._id.toString(), email, true, {
      subscription: user.subscription?.plan,
      status: subscriptionStatus,
    });

    this.loggerService.info(`User logged in: ${email}`, {
      userId: user._id.toString(),
      email,
      subscription: user.subscription?.plan,
    }, 'Auth');

    return {
      message: 'Login successful',
      token,
      user: this.sanitizeUser(user),
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitizeUser(user);
  }

  private generateToken(user: UserDocument): string {
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      subscription: {
        plan: user.subscription?.plan || 'trial',
        status: user.subscription?.status || 'expired',
      },
    };

    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: UserDocument) {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      subscription: {
        plan: user.subscription?.plan || 'trial',
        status: user.subscription?.status || 'expired',
        expiresAt: user.subscription?.expiresAt,
      },
      lastLoginAt: user.lastLoginAt,
    };
  }
}
