import { organizationInfo } from "../../../adastra.config.mjs";

type UsersQuery = {
  data: {
    organization: {
      membersWithRole: {
        edges: {
          node: { login: string; name: string };
          role: string;
        }[];
      };
    };
  };
};

export const getUsers = async (
  roleFilter: string[] = []
): Promise<{ login: string; name: string }[]> => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BEARER ${import.meta.env.GITHUB_SECRET}`,
    },
    body: JSON.stringify({
      query: `
      query ($org: String!, $after: String) {
        organization(login: $org) {
          membersWithRole(first: 100, after: $after) {
            edges {
              node {
                login
                name
              }
              role
            }
          }
        }
      }
    `,
      variables: {
        org: organizationInfo.name,
      },
    }),
  });

  const { data }: UsersQuery = await response.json();
  const users = data.organization.membersWithRole.edges
    .filter((edge) => roleFilter.includes(edge.role))
    .map(({ node }) => node);

  return users;
};

export const getUsersWithRole = async (): Promise<
  { login: string; name: string; role: string }[]
> => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BEARER ${import.meta.env.GITHUB_SECRET}`,
    },
    body: JSON.stringify({
      query: `
      query ($org: String!, $after: String) {
        organization(login: $org) {
          membersWithRole(first: 100, after: $after) {
            edges {
              node {
                login
                name
              }
              role
            }
          }
        }
      }
    `,
      variables: {
        org: organizationInfo.name,
      },
    }),
  });

  const { data }: UsersQuery = await response.json();
  const users = data.organization.membersWithRole.edges.map(
    ({ node, role }) => ({ ...node, role })
  );

  return users;
};

// query prueba1 ($org: String!) {
//   organization(login: $org) {
//     teams(first: 100, userLogins: ["alu0101329093"]) {
//       totalCount
//       edges {
//         node {
//           name,
//           repositories {
//             edges {
//               node {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
