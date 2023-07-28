<template>
  <q-page>
    <div class="text-h2 text-center q-pa-xl">
      Корзина товаров
      <q-card class="" v-for="book in books" :key="book.id">
        <div class="flex justify-around">
          <q-card-section>
            <q-img :src="book.image" width="150px"></q-img>
          </q-card-section>
          <q-card-section class="text-h6">
            {{ book.author }} - {{ book.title }}
          </q-card-section>
          <q-card-section class="flex column justify-evenly">
            <div class="btn_qtn">
              <q-btn
                round
                color="purple"
                glossy
                icon="plus"
                @click="decrement(book)"
              />
              <q-btn outline style="color: black">{{ book.quantity }}</q-btn>
              <q-btn
                round
                color="purple"
                glossy
                icon="minus"
                @click="increment(book)"
              />
            </div>
            <div class="text-h6">{{ book.price }} P</div>
          </q-card-section>
        </div>
      </q-card>
      <div>
        <h5>Итоговая сумма заказа: {{ store.totalValue }}</h5>
        <q-btn
          style="background: black; color: white"
          label="Оформить заказ"
          @click="dialog = true"
        />
      </div>
      <q-dialog v-model="dialog" persistent>
        <q-card>
          <q-card-section class="row items-center"> </q-card-section>
          <div class="q-pa-md" style="max-width: 400px">
            <q-form
              @submit.prevent="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="name"
                label="ФИО *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Заполните обязательное поле',
                ]"
              />
              <q-input
                filled
                type="tel"
                v-model="formNum"
                label="Номер телефона *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Заполните обязательное поле',
                ]"
              />
              <q-input
                filled
                type="email"
                v-model="formEmail"
                label="Email *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Заполните обязательное поле',
                ]"
              />
              <q-input
                filled
                type="text"
                v-model="formAddress"
                label="Адрес доставки *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Заполните обязательное поле',
                ]"
              />
              <q-input
                filled
                type="text"
                v-model="formCom"
                label="Комментарий"
                lazy-rules
              />
              <q-toggle
                v-model="accept"
                label="Я принимаю условия обработки персональных данных"
              />
              <div>
                <q-btn flat label="Отмена" v-close-popup color="black" />
                <q-btn
                  label="Оформить"
                  type="submit"
                  style="background: black; color: white"
                />
              </div>
            </q-form>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, computed, onMounted } from "vue";
import { getBooks } from "stores/books";
import { ClosePopup, useQuasar } from "quasar";

/*
 -------------pinia----------
 */

const store = getBooks();
store.GET_BOOKS_FROM_DB();
const books = store.SET_CART;

/*
 -------------order form----------
 */

const dialog = ref(false);
const $q = useQuasar();
const name = ref(null);
const formNum = ref(null);
const formEmail = ref(null);
const formCom = ref(null);
const formAddress = ref(null);
const accept = ref(false);

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message:
        "Необходимо согласиться с условиями обработки персональных данных",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Заказ оформлен",
    });
    onReset();
    dialog.value = false;
  }
};

const onReset = () => {
  name.value = null;
  formNum.value = null;
  formEmail.value = null;
  accept.value = null;
  formAddress.value = null;
};

/*
 -------------quantity----------
 */

const increment = (book) => {
  store.INCREMENT(book);
};

const decrement = (book) => {
  store.DECREMENT(book);
};

</script>















