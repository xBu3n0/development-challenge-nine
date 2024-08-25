import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const countries = [{ name: "Brazil" }, { name: "Argentina" }];

  const states = [
    { name: "State 1" },
    { name: "State 2" },
    { name: "State 3" },
    { name: "State 4" },
  ];

  const cities = [
    { name: "City 1" },
    { name: "City 2" },
    { name: "City 3" },
    { name: "City 4" },
    { name: "City 5" },
    { name: "City 6" },
    { name: "City 7" },
    { name: "City 8" },
    { name: "City 9" },
  ];

  countries
    .map((country) => {
      return prisma.country.create({ data: country });
    })
    .map(async (countryPromise) => {
      const country = await countryPromise;

      states
        .map((state) => {
          return prisma.state.create({
            data: {
              ...state,
              countryId: country.id,
            },
          });
        })
        .map(async (statePromise) => {
          const state = await statePromise;

          cities
            .map((city) => {
              return prisma.city.create({
                data: {
                  ...city,
                  stateId: state.id,
                },
              });
            })
            .map(async (cityPromise) => {
              const city = await cityPromise;

              console.log(city);
            });
        });
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
