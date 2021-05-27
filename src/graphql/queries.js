/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBeitelag = /* GraphQL */ `
  query GetBeitelag($id: ID!) {
    getBeitelag(id: $id) {
      id
      name
      description
      members
      beitelagMembers {
        items {
          id
          beitelagID
          sharedWith
          nickName
          createdAt
          updatedAt
        }
        nextToken
      }
      joinRequests {
        items {
          id
          beitelagID
          nickname
          email
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBeitelags = /* GraphQL */ `
  query ListBeitelags(
    $id: ID
    $filter: ModelBeitelagFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBeitelags(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        members
        beitelagMembers {
          nextToken
        }
        joinRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJoinRequest = /* GraphQL */ `
  query GetJoinRequest($id: ID!) {
    getJoinRequest(id: $id) {
      id
      beitelagID
      nickname
      email
      beitelag {
        id
        name
        description
        members
        beitelagMembers {
          nextToken
        }
        joinRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listJoinRequests = /* GraphQL */ `
  query ListJoinRequests(
    $id: ID
    $filter: ModelJoinRequestFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listJoinRequests(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        beitelagID
        nickname
        email
        beitelag {
          id
          name
          description
          members
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBeitelagMember = /* GraphQL */ `
  query GetBeitelagMember($id: ID!) {
    getBeitelagMember(id: $id) {
      id
      beitelagID
      sharedWith
      nickName
      beitelag {
        id
        name
        description
        members
        beitelagMembers {
          nextToken
        }
        joinRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      trips {
        items {
          id
          name
          started
          observations
          userPath
          shared
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBeitelagMembers = /* GraphQL */ `
  query ListBeitelagMembers(
    $id: ID
    $filter: ModelBeitelagMemberFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBeitelagMembers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        beitelagID
        sharedWith
        nickName
        beitelag {
          id
          name
          description
          members
          createdAt
          updatedAt
        }
        trips {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!, $started: AWSDateTime!) {
    getTrip(id: $id, started: $started) {
      id
      name
      started
      observations
      userPath
      shared
      observationImages {
        name
        image {
          bucket
          region
          key
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $id: ID
    $started: ModelStringKeyConditionInput
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTrips(
      id: $id
      started: $started
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        started
        observations
        userPath
        shared
        observationImages {
          name
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const joinRequestByBeitelag = /* GraphQL */ `
  query JoinRequestByBeitelag(
    $beitelagID: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelJoinRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    joinRequestByBeitelag(
      beitelagID: $beitelagID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        beitelagID
        nickname
        email
        beitelag {
          id
          name
          description
          members
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const beitelagMemberByBeitelag = /* GraphQL */ `
  query BeitelagMemberByBeitelag(
    $beitelagID: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBeitelagMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    beitelagMemberByBeitelag(
      beitelagID: $beitelagID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        beitelagID
        sharedWith
        nickName
        beitelag {
          id
          name
          description
          members
          createdAt
          updatedAt
        }
        trips {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
