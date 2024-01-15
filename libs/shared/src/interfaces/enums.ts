export enum IdentityVerificationStatus {
  rejected = 'rejected',
  verified = 'verified',
  reviewNeeded = 'reviewNeeded',
}

export enum BullQueueTasks {
  MESSAGE_QUEUE = 'message-queue',
  PAYMENT_QUEUE = 'payment-queue',
  ACCOUNT_QUEUE = 'account-queue',
  REGISTER_SUBSCRIPTION = 'register_subscription',
  SEND_EMAIL = 'send-email',
  SEND_SMS = 'send-sms',
  FINALIZE_DONATION = 'finalize-donation-transaction',
  FINALIZE_ENDOWMENT = 'finalize-endowment-transaction',
  SEND_BULK_NOTIFICATION = 'send-bulk-notification',
  SEND_NOTIFICATION = 'send-notification',
  SEND_GENERATED_TAX_PDF = 'send-generated-tax-pdf',
  SEND_INSTITUTION_APPROVAL = 'send-institution-approval',
  COMPUTE_ACCOUNT_INTEREST = 'compute-account-interest',
}

export enum ApprovalStatus {
  PENDING = 'pending',
  INREVIEW = 'inReview',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum AccountStatus {
  ACTIVE = 'active',
  DORMANT = 'dormant',
  CLOSED = 'closed',
}

export enum TransactionFrequency {
  ONETIME = 'one_time',
  ONE_TIME = 'one time',
  RECURRING = 'recurring',
}

export enum DonorType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
  FAMILY = 'FAMILY',
  PHILANTHROPIST = 'PHILANTHROPIST',
}

export enum DonationPeriod {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
  FAMILY = 'FAMILY',
  PHILANTHROPIST = 'PHILANTHROPIST',
}
export enum HubspotOP {
  CREATE_CONTACT = 'create.contact',
  CREATE_COMPANY = 'create.company',
  UPDATE_CONTACT = 'update.contact',
  CREATE_APPROVAL = 'create.approval',
  UPDATE_APPROVAL = 'update.approval',
}

export enum QueueTasks {
  UPLOAD_PHOTO = 'task.upload.photo',
  SEND_EMAIL = 'task.send.email',
  SEND_NODE_MAILER_EMAIL = 'task.send.node.mailer.email',
  SEND_TWILIO_SMS = 'task.send.twilio.sms',
  PING = 'task.send.ping',
  GENERATE_URIS = 'task.send.generate.uris',
  CALCULATE_AVERAGE_DAILY_SAVINGS = 'task.calculate.average.daily',
  SMART_CONTRIBUTION_TRANSFER = 'task.smart.contribution.transfer',
  WEBHOOK_FINALISE_DONATION_REQUEST = 'task.webhook.finallise.donation.request',
  WEBHOOK_PLAID_HANDLER_REQUEST = 'task.webhook.plaid.handler.request',
  HUBSPOT_HANDLER_REQUEST = 'task.hubspot.handler.request',
}

export enum WorkerQueue {
  PROCESS_WORK = 'wevied.jobs.process.work',
}

export enum AppStatus {
  WORKER_ERROR = 1000,
}

export enum InvitationStatus {
  Accepted = 'Accepted',
  Declined = 'Declined',
  Pending = 'Pending',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum UserType {
  Individual = 'Individuals',
  Schools = 'Schools',
}

export enum ContributionStatus {
  Success = 'Success',
  Declined = 'Declined',
  Failed = 'Failed',
  Pending = 'Pending',
}
export enum FundawardStatus {
  Success = 'succeeded',
  Declined = 'declined',
  Failed = 'failed',
  Pending = 'pending',
}

export enum DonationStatus {
  Success = 'successful',
  Declined = 'declined',
  Failed = 'failed',
  Pending = 'pending',
}

export enum TransactionMethodEnum {
  Deposit = 'Deposit',
  Withdrawal = 'Withdrawal',
  Tranfer_BTA = 'Transfer_btw_Accounts',
  Tranfer_OWNA = 'Transfer_btw_own_accounts',
}

export enum SchoolType {
  College = 'College',
  University = 'University',
  Polytechnic = 'Polytechnic',
  Highschool = 'High School',
  Elementary = 'Elementary',
  Church = 'church',
}

export enum ApplicationStatus {
  Pending = 'pending',
  Rejected = 'rejected',
  Accepted = 'accepted',
  Withdraw = 'withdraw',
}

export enum DeductionType {
  SMART_DEDUCTION = 'smart_deduction',
  AUTO_CONTRIBUTION = 'auto_contribution',
  MANUAL_CONTRIBUTION = 'manual_contribution',
}

export enum TransactionCategory {
  DONATION = 'donation',
  DONATION_UNIT = 'donation_unit',
  ENDOWMENT = 'endowment',
  ENDOWMENT_UNIT = 'endowment_unit',
  INTERNAL = 'internal',
}

export enum TransactionChannel {
  CARD = 'card',
  LIVE_WIRE = 'live wire',
  TRANSFER = 'transfar',
  PLAID_TRANSFER = 'plaid transfer',
}

export enum SendEmailNotifications {
  SEND_EMAIL_NOTIFICATIONS = 'send_me_email_notifications',
  ONCE_AN_HOUR_AT_MOST = 'once_an_hour_at_most',
  NEVER = 'never',
}

export enum SignInNotifications {
  MOST_SECURE = 'most_secure',
  STANDARD = 'standard',
  DONT_SEND_NOTIFICATIONS = 'dont_send_notifications',
}

export enum ActivityType {
  Create = 'Create',
  Apply = 'Apply',
  Fund = 'Fund',
  Win = 'Win',
}

export enum IntervalType {
  ONE_TIME = 'one-time',
  MONTHLY = 'monthly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  EVERY_TWO_WEEKS = 'every-two-weeks',
  TWICE_EVERY_MONTH = 'twice-every-month',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export enum ChargeOnType {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  PATCH = 'patch',
}

export interface Document {
  description: string;
  type: string;
  url: string;
}

export interface IScreeningQuestionsAnswers {
  question: string;
  type: string;
  answer: string;
}

export enum AppAccountType {
  Individual = 'Individual',
  Institution = 'Institution',
}

export enum AccountToCreditType {
  Donation = 'donation',
  Endowment = 'endowment',
}
