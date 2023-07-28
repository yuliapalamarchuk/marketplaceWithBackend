<template>
  <q-layout class="bg-grey-1">
    <q-header
      elevated
      class="text-white"
      style="background: #24292e"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn
          to="/homepage"
          round
          dense
          flat
          :ripple="false"
          icon="favorite_border"
          size="19px"
          color="white"
          class="q-mr-sm"
          no-caps
        />

        <div
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center"
        >
          <q-item to="/catalog" class="text-white text-h5">Каталог </q-item>
        </div>
        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn to="/cart" dense flat round size="m" icon="shopping_cart" />

          <q-btn dense flat no-wrap>
            <q-avatar rounded size="50px">
              <span class="material-icons"> account_circle </span>
            </q-avatar>

            <q-item id="auth-links">
              <q-btn
                class="actions-header_login"
                label="Войти"
                type="button"
                @click="login"
            /></q-item>

            <div>
              <div id="user-button"></div>
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { from } from "@apollo/client/core";
import Clerk from "@clerk/clerk-js";
import { login, logout } from "../clerk/user";

const publishableKey =
  "pk_test_cHJlY2lvdXMtYmVhci01LmNsZXJrLmFjY291bnRzLmRldiQ";
const script = document.createElement("script");
script.setAttribute("data-clerk-publishable-key", publishableKey);
script.async = true;
script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
script.crossOrigin = "anonymous";
script.addEventListener("load", async function () {
  await window.Clerk.load();

  const userButton = document.getElementById("user-button");
  const authLinks = document.getElementById("auth-links");

  window.Clerk.addListener(({ user }) => {
    authLinks.style.display = user ? "none" : "";
  });

  if (window.Clerk.user) {
    window.Clerk.mountUserButton(userButton);
    userButton.style.margin = "auto";

    localStorage.setItem("session_id", window.Clerk.session.id);
  }
});
document.body.appendChild(script);
</script>


<style lang="sass">
.GL
  &:hover
    background: #0366d6
    color: white
    .q-item__section--side
      color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-input.q-field--focused
    width: 450px !important
    background: white
    .q-field__append
      display: none
</style>






