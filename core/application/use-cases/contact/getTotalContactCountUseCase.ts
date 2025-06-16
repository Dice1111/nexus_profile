// import { getTotalContactCount } from "@/core/infrastructure/models/contact";
// import { SearchParams } from "@/lib/url-state";
// import { CONTACT_TAG_TYPE, Prisma } from "@prisma/client";

// export async function getTotalContactCountUseCase(searchParams: SearchParams) {
//   const cardId = "applecard";

//   const whereClause: Prisma.ContactWhereInput = {
//     cardId: cardId,
//   };

//   if (Array.isArray(searchParams.filter) && searchParams.filter.length > 0) {
//     console.log(searchParams.filter);
//     whereClause.tag = {
//       in: searchParams.filter as CONTACT_TAG_TYPE[],
//     };
//   }

//   if (searchParams.search) {
//     const keyword = searchParams.search;
//     whereClause.ContactCard = {
//       Information: {
//         OR: [
//           { firstName: { contains: keyword, mode: "insensitive" } },
//           { middleName: { contains: keyword, mode: "insensitive" } },
//           { lastName: { contains: keyword, mode: "insensitive" } },
//           { occupation: { contains: keyword, mode: "insensitive" } },
//           { company: { contains: keyword, mode: "insensitive" } },
//         ],
//       },
//     };
//   }

//   const contacts = await getTotalContactCount({
//     whereClause,
//   });

//   return contacts;
// }
