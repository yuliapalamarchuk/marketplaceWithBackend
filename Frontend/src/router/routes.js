const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "/catalog", component: () => import("pages/Catalog.vue") },
      { path: "/cart", component: () => import("pages/Cart.vue") },
      { path: "/homepage", component: () => import("pages/HomePage.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
