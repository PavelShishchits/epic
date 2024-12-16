import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';
import fs from 'node:fs';

const prisma = new PrismaClient();

const USERS_NUMBER = 5;

const uniqueUsernameEnforcer = new UniqueEnforcer();

const createUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = uniqueUsernameEnforcer.enforce(() => {
    return (
      faker.string.alphanumeric({ length: 2 }) +
      '_' +
      faker.internet.username({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      })
    )
      .slice(0, 20)
      .toLowerCase()
      .replace(/^a-z0-9_/g, '_');
  });
  const fullname = `${firstName} ${lastName}`;

  return {
    username,
    name: fullname,
    email: `${username}.example.com`,
  };
};

const createImage = async ({
  altText,
  filepath,
}: {
  altText: string;
  filepath: string;
}) => {
  return {
    altText,
    contentType: filepath.endsWith('.png') ? 'image/png' : 'image/jpeg',
    blob: await fs.promises.readFile(filepath),
  };
};

const createNote = () => {
  const title = faker.lorem.sentence();
  const content = faker.lorem.paragraph();

  return {
    title,
    content,
  };
};

const seed = async () => {
  await prisma.user.deleteMany();

  const userImages = await Promise.all(
    Array.from({ length: 5 }).map((_, index) =>
      createImage({
        altText: `user image ${index}`,
        filepath: `./tests/fixtures/images/user/${index}.jpg`,
      })
    )
  );

  const noteImages = await Promise.all(
    Array.from({ length: 5 }).map((_, index) =>
      createImage({
        altText: `note image ${index}`,
        filepath: `./tests/fixtures/images/note/${index}.png`,
      })
    )
  );

  for (let i = 0; i < USERS_NUMBER; i++) {
    await prisma.user
      .create({
        select: { id: true },
        data: {
          ...createUser(),
          image: {
            create: userImages[i % 5],
          },
          notes: {
            create: await Promise.all(
              Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(
                async () => {
                  const note = createNote();

                  return {
                    ...note,
                    images: {
                      create: Array.from({
                        length: faker.number.int({ min: 0, max: 3 }),
                      }).map(() => {
                        return noteImages[faker.number.int({ min: 0, max: 4 })];
                      }),
                    },
                  };
                }
              )
            ),
          },
        },
      })
      .catch((e) => {
        console.log('Error creating user', e);
      });
  }

  // create static user
  await prisma.user.create({
    select: { id: true },
    data: {
      email: 'kody@kcd.dev',
      username: 'kody',
      name: 'Kody',
      image: { create: userImages[0] },
      notes: {
        create: [
          {
            id: 'd27a197e',
            title: 'Basic Koala Facts',
            content:
              'Koalas are found in the eucalyptus forests of eastern Australia. They have grey fur with a cream-coloured chest, and strong, clawed feet, perfect for living in the branches of trees!',
            images: { create: [noteImages[0], noteImages[1]] },
          },
        ],
      },
    },
  });
};

seed()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
