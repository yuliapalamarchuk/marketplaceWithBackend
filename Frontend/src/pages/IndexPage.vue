<template>
  <q-page>
    <div v-if="post">GraphQL query result:<br />{{ post.title }}</div>
    <div v-else>loading...</div>
  </q-page>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "PageIndex",

  // https://apollo.vuejs.org/guide/apollo/#usage-in-vue-components
  apollo: {
    post: {
      query: gql`
        query {
          post(id: 5) {
            title
          }
        }
      `,
    },
  },
};
</script>
