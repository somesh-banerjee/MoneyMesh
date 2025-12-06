import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { TransactionService } from "./transaction.service";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { JwtPayload } from "src/shared/decorators/jwt-payload.decorator";

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Get('download/:accountId')
  @UseGuards(JwtAuthGuard)
  async downloadTransactions(
    @JwtPayload('id') userId: string,
    @Param('accountId') accountId: string,
    @Res() res: Response
  ) {
    const txs = await this.transactionService.downloadTransactions(userId, accountId);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${accountId}_transactions.csv"`);
    res.send(txs);
  }

} 