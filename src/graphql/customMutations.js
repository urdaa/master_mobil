export const createJoinRequestCustom = /* GraphQL */ `
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
      }
    }
  }
`;
export const createBeitelagCustom = /* GraphQL */ `
  mutation CreateBeitelag(
    $input: CreateBeitelagInput!
    $condition: ModelBeitelagConditionInput
  ) {
    createBeitelag(input: $input, condition: $condition) {
      id
      name
      description
      beitelagMembers {
        items {
          id
          beitelagID
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
    }
  }
`;
export const createBeitelagMemberCustom = /* GraphQL */ `
  mutation CreateBeitelagMember(
    $input: CreateBeitelagMemberInput!
    $condition: ModelBeitelagMemberConditionInput
  ) {
    createBeitelagMember(input: $input, condition: $condition) {
      beitelagID
      id
      nickName
      beitelag {
        id
        name
        description
        beitelagMembers {
          items {
            id
            beitelagID
            nickName
            createdAt
            updatedAt
          }
          nextToken
        }
      }
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
      nickName
    }
  }
`;
export const deleteJoinRequestCustom = /* GraphQL */ `
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
        joinRequests {
          nextToken
          items {
            id
            beitelagID
            nickname
            email
          }
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
