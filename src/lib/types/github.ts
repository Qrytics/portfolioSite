import { z } from 'zod';

/**
 * GitHub API Types and Zod Schemas
 * For runtime validation of GitHub GraphQL/REST API responses
 */

// Contribution Day
export const ContributionDaySchema = z.object({
	date: z.string(),
	contributionCount: z.number(),
	color: z.string().nullable().optional()
});

export type GitHubContributionDay = z.infer<typeof ContributionDaySchema>;

// Contribution Week
export const ContributionWeekSchema = z.object({
	contributionDays: z.array(ContributionDaySchema)
});

export type GitHubContributionWeek = z.infer<typeof ContributionWeekSchema>;

// Contribution Calendar
export const ContributionCalendarSchema = z.object({
	totalContributions: z.number(),
	weeks: z.array(ContributionWeekSchema)
});

export type GitHubContributionCalendar = z.infer<typeof ContributionCalendarSchema>;

// Contribution Year Data
export const ContributionYearSchema = z.object({
	year: z.number(),
	totalContributions: z.number(),
	weeks: z.array(ContributionWeekSchema)
});

export type GitHubContributionYear = z.infer<typeof ContributionYearSchema>;

// Repository
export const RepositorySchema = z.object({
	name: z.string(),
	full_name: z.string().optional(),
	description: z.string().nullable(),
	html_url: z.string(),
	language: z.string().nullable(),
	stargazers_count: z.number().optional(),
	fork: z.boolean().optional(),
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
	pushed_at: z.string().optional()
});

export type GitHubRepository = z.infer<typeof RepositorySchema>;

// GraphQL Response for Contributions
export const GraphQLContributionResponseSchema = z.object({
	data: z.object({
		user: z.object({
			contributionsCollection: z.object({
				contributionCalendar: ContributionCalendarSchema
			})
		})
	})
});

export type GraphQLContributionResponse = z.infer<typeof GraphQLContributionResponseSchema>;
