/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBeitelag = /* GraphQL */ `
  mutation CreateBeitelag(
    $input: CreateBeitelagInput!
    $condition: ModelBeitelagConditionInput
  ) {
    createBeitelag(input: $input, condition: $condition) {
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
export const updateBeitelag = /* GraphQL */ `
  mutation UpdateBeitelag(
    $input: UpdateBeitelagInput!
    $condition: ModelBeitelagConditionInput
  ) {
    updateBeitelag(input: $input, condition: $condition) {
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
export const deleteBeitelag = /* GraphQL */ `
  mutation DeleteBeitelag(
    $input: DeleteBeitelagInput!
    $condition: ModelBeitelagConditionInput
  ) {
    deleteBeitelag(input: $input, condition: $condition) {
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
export const createJoinRequest = /* GraphQL */ `
  mutation CreateJoinRequest(
    $input: CreateJoinRequestInput!
    $condition: ModelJoinRequestConditionInput
  ) {
    createJoinRequest(input: $input, condition: $condition) {
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
export const updateJoinRequest = /* GraphQL */ `
  mutation UpdateJoinRequest(
    $input: UpdateJoinRequestInput!
    $condition: ModelJoinRequestConditionInput
  ) {
    updateJoinRequest(input: $input, condition: $condition) {
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
export const deleteJoinRequest = /* GraphQL */ `
  mutation DeleteJoinRequest(
    $input: DeleteJoinRequestInput!
    $condition: ModelJoinRequestConditionInput
  ) {
    deleteJoinRequest(input: $input, condition: $condition) {
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
export const createBeitelagMember = /* GraphQL */ `
  mutation CreateBeitelagMember(
    $input: CreateBeitelagMemberInput!
    $condition: ModelBeitelagMemberConditionInput
  ) {
    createBeitelagMember(input: $input, condition: $condition) {
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
export const updateBeitelagMember = /* GraphQL */ `
  mutation UpdateBeitelagMember(
    $input: UpdateBeitelagMemberInput!
    $condition: ModelBeitelagMemberConditionInput
  ) {
    updateBeitelagMember(input: $input, condition: $condition) {
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
export const deleteBeitelagMember = /* GraphQL */ `
  mutation DeleteBeitelagMember(
    $input: DeleteBeitelagMemberInput!
    $condition: ModelBeitelagMemberConditionInput
  ) {
    deleteBeitelagMember(input: $input, condition: $condition) {
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
export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
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
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
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
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
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
