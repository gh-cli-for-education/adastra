import { organizationInfo } from "../../../adastra.config.mjs";

export type UserInfo = {
  login: string;
  name: string;
  avatarUrl: string;
  url: string;
};

export type UsersQuery = {
  data: {
    organization: {
      membersWithRole: {
        edges: {
          node: UserInfo;
          role: string;
        }[];
      };
    };
  };
};

export const getUsers = async (roleFilter?: string[]): Promise<UserInfo[]> => {
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
                  avatarUrl
                  url
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

  if (roleFilter == undefined)
    return data.organization.membersWithRole.edges.map(({ node }) => node);

  return data.organization.membersWithRole.edges
    .filter((edge) => roleFilter.includes(edge.role))
    .map(({ node }) => node);
};

export type UserInfoWithRole = UserInfo & {
  role: string;
};

export const getUsersWithRole = async (): Promise<UserInfoWithRole[]> => {
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

export type RepositoryInfo = {
  name: string;
  url: string;
  templateRepository?: string;
};

export type TeamsInfo = {
  name: string;
  url: string;
  repositoriesUrl: string;
  repositories: RepositoryInfo[];
};

export type TeamsQuery = {
  data: {
    organization: {
      teams: {
        edges: {
          node: Omit<TeamsInfo, "repositories"> & {
            repositories: {
              edges: {
                node: Omit<RepositoryInfo, "templateRepository"> & {
                  templateRepository?: {
                    name: string;
                  };
                };
              }[];
            };
          };
        }[];
      };
    };
  };
};

export const getTeams = async (user: UserInfo): Promise<TeamsInfo[]> => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BEARER ${import.meta.env.GITHUB_SECRET}`,
    },
    body: JSON.stringify({
      query: `
        query ($org: String!, $user: [String!]!) {
          organization(login: $org) {
            teams(first: 100, userLogins: $user) {
              edges {
                node {
                  name,
                  url,
                  repositoriesUrl,
                  repositories {
                    edges {
                      node {
                        name,
                        url,
                        templateRepository {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        org: organizationInfo.name,
        user: [user.login],
      },
    }),
  });

  const { data }: TeamsQuery = await response.json();

  const teams = data.organization.teams.edges.map(({ node }) => ({
    ...node,
    repositories: node.repositories.edges.map(({ node }) => ({
      ...node,
      templateRepository: node.templateRepository?.name,
    })),
  }));

  return teams;
};

export type OrganizationInfo = {
  url: string;
  teamsUrl: string;
  projectsUrl: string;
};

export type OrganizationInfoQuery = {
  data: {
    organization: OrganizationInfo;
  };
};

export const getOrganizationInfo = async (): Promise<OrganizationInfo> => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `BEARER ${import.meta.env.GITHUB_SECRET}`,
    },
    body: JSON.stringify({
      query: `
        query ($org: String!) {
          organization(login: $org) {
            url
            teamsUrl
            projectsUrl
            
          }
        }
      `,
      variables: {
        org: organizationInfo.name,
      },
    }),
  });

  const { data }: OrganizationInfoQuery = await response.json();

  const { organization } = data;

  return organization;
};
