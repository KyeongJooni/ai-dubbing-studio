CREATE TABLE `allowed_emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `allowed_emails_email_unique` ON `allowed_emails` (`email`);