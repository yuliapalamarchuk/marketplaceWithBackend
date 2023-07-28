<template>
  <q-page>
    <div class="text-center text-h2 q-pa-xl">Каталог книг</div>
    <div class="row col">
      <div class="flex col-3 justify-around column">
        <q-input
            filled
            v-model="inputData"
            label="Поиск"
            placeholder="Введите название"
            :dense="dense"
        />
        <q-select
            filled
            color="purple-12"
            v-model="model"
            :options="option"
            label="сортировать по жанру"
            :select="filterByGenres(model)"
        />
        <q-select
            filled
            v-model="single"
            :options="sortingAr"
            label="Сортировать по цене"
            :select="sortedByPrice(single)"
        />
      </div>
      <q-card
          class="my-card col-xl-3 col-md-3 col-sm-6 col-xs-12 flex no-wrap"
          v-for="book of searchHandler"
          :key="book.name"
      >
        <q-card-section>
          <q-img :src="book.image" width="250px">
            <div class="absolute-top text-subtitle1">
              {{ book.genre }}
            </div>
            <div class="absolute-bottom text-h6">
              {{ book.author }} - {{ book.title }}
            </div>
          </q-img>
          <q-card-section class="flex">
            <q-btn
                @click="dialogDesc(book)"
                color="black"
                label="Подробнее"
                style="width: 100px"
            />
            <div class="q-pl-sm text-bold text-h6">{{ book.price }} рублей</div>
          </q-card-section>
        </q-card-section>
        <q-dialog v-model="icon">
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="flex justify-between col">
                <div class="text-subtitle1">
                  {{ descDial.author }} - {{ descDial.title }}
                </div>
                <q-btn icon="close" flat round dense v-close-popup/>
              </div>
              <div class="flex row">
                <q-img :src="descDial.image" width="250px" class="col-6"/>
                <div class="col-6 q-pa-md">{{ descDial.description }}</div>
              </div>
              <div class="flex justify-end col q-pb-md">
                <q-btn
                    color="black"
                    label="Добавить в корзину"
                    @click="addToCart(descDial)"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card>
    </div>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-page>
</template>

<script setup>
/*
 -------------import----------
 */
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {getBooks} from "stores/books";

/*
 -------------pinia----------
 */

const store = getBooks();
store.GET_BOOKS_FROM_DB();
const books = store.SET_BOOKS_FROM_DB;
const router = useRouter();
const model = ref("");
const filteredBooks = ref([]);

/*
 -------------filter by genres----------
 */

const selectedGenres = computed(() => {
  if (!filteredBooks.value.length) {
    return books.value;
  } else {
    return filteredBooks.value;
  }
});

const filterByGenres = (model) => {
  filteredBooks.value.length = 0;
  books.value.map((elem) => {
    if (elem.genre === model.value) {
      filteredBooks.value.push(elem);
    } else {
      return;
    }
  });
};

/*
  -----------filter genres----------
*/

const option = [
  {
    label: "Художественная литература",
    value: "Художественная литература",
  },
  {
    label: "Компьютерная литература",
    value: "Компьютерная литература",
  },
  {
    label: "Научная литература",
    value: "Научная литература",
  },
  {
    label: "Бизнес, экономика и право",
    value: "Бизнес, экономика и право",
  },
  {
    label: "Психология и эзотерика",
    value: "Психология и эзотерика",
  },
  {
    label: "Книги в оригинале",
    value: "Книги в оригинале",
  },
  {
    label: "Все книги",
    value: "Все книги",
  },
];

/*
 * --------------dialog----------------
 */

const descDial = ref("");
const dialogDesc = (item) => {
  descDial.value = "";
  descDial.value = item;
  icon.value = true;
};
const icon = ref(false);

/**
 * --------------Add to cart-----------
 */

const addToCart = (descDial) => {
  const cloneAddToCart = {...descDial};
  store.ADD_TO_CART(cloneAddToCart);
};

/*
----------------------SEARCH-------------
*/

const inputData = ref("");
const searchHandler = computed(() => {
  return selectedGenres.value.filter((elem) => {
    return elem.title.toLowerCase().includes(inputData.value.toLowerCase());
  });
});

/*
 ------------ sort by price---------------
 */

const sortByAsc = (x, y) => {
  return x.price > y.price ? 1 : -1;
};

const sortByDesc = (x, y) => {
  return x.price < y.price ? 1 : -1;
};
const single = ref("");
const sortingAr = [
  {
    value: "По возрастанию цены",
    label: "По возрастанию цены",
  },
  {
    value: "По убыванию цены",
    label: "По убыванию цены",
  },
];
const sortedByPrice = (single) => {
  switch (single.value) {
    case "По возрастанию цены":
      return searchHandler.value.sort(sortByAsc);
    case "По убыванию цены":
      return searchHandler.value.sort(sortByDesc);
  }
};
</script>

