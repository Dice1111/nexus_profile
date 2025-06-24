import { fetchDailyFollowerCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-daily-follower-count-by-card-id.use-case";
import { fetchTotalContactCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-total-contact-count-by-card-id.use-case";
import { fetchTotalFollowerCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-total-follower-count-by-card-id.use-case";
import { fetchTotalRequestCountByCardIdUseCase } from "@/core/_application/use-cases/request/fetch-total-request-count-by-card-id.use-case";
import { fetchOverviewStatisticByCardIdController } from "@/core/_controllers/overview/fetch-overview-statistic-by-card-id.controller";
import { ContactRepository } from "@/core/_infrastructure/repositories/contact.repository";
import { RequestRepository } from "@/core/_infrastructure/repositories/request.repository";

export default function buildFetchOverviewStatisticByCardId() {
  const contactRepository = new ContactRepository();
  const requestRepository = new RequestRepository();
  const contactCountUseCase =
    fetchTotalContactCountByCardIdUseCase(contactRepository);
  const followerCountUseCase =
    fetchTotalFollowerCountByCardIdUseCase(contactRepository);
  const requestCountUseCase =
    fetchTotalRequestCountByCardIdUseCase(requestRepository);
  const dailyFollowerCountUseCase =
    fetchDailyFollowerCountByCardIdUseCase(contactRepository);
  return fetchOverviewStatisticByCardIdController(
    contactCountUseCase,
    followerCountUseCase,
    requestCountUseCase,
    dailyFollowerCountUseCase
  );
}
