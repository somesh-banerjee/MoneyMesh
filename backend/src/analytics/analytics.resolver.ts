import { JwtPayload } from "src/shared/decorators/jwt-payload.decorator";
import { HomePageAnalyticsDto, TimelineAnalyticsDto } from "./analytics.dto";
import { AnalyticsService } from "./analytics.service";
import { Args, Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Query(() => HomePageAnalyticsDto)
  async getHomePageAnalytics(
    @JwtPayload('id') userId: string,
    @Args('period', { defaultValue: 'monthly' }) period: 'monthly' | 'yearly',
    @Args('range', { defaultValue: 'current' }) range: 'current' | 'previous') {
    return this.analyticsService.homePageAnalytics(userId, period, range)
  }

  @Query(() => [TimelineAnalyticsDto])
  async getTimelineAnalytics(
    @JwtPayload('id') userId: string,
    @Args('accountId') accountId: string,
    @Args('from') from: Date,
    @Args('to') to: Date) {
    return this.analyticsService.timelineAnalytics(userId, accountId, from, to)
  }

}
