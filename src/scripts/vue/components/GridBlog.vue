<!-- 
  Props:
    title: string
    blog-data: array - blog.articles
    article-url: array
-->

<template>
  <h4 class="flex-center h2 block py-20">{{ heading }}</h4>

  <div
    class="grid gap-y-12 gap-x-4 grid-cols-2 tablet:grid-cols-3 tablet:gap-y-20 tablet:gap-x-5"
  >
    <template v-for="item in articles" :key="item.id">
      <div>
        <div class="blog-grid__img relative">
          <a :href="item.url">
            <v-image
              v-if="item.image"
              :image="item.image"
              class="absolute inset-0 h-full w-full object-cover object-top"
            ></v-image>
            <div v-else class="w-full h-full bg-darkblue"></div>
          </a>
        </div>
        <a :href="item.url">
          <h3 class="pt-4 tablet:pt-5 pb-3 tablet:pb-4 text-black-100 text-reg font-semibold truncate uppercase">
            {{ item.title }}
          </h3>
        </a>
        <div class="font-normal inline-flex text-reg">
          <span class="text-black-100" v-text="item.formatAuthor()"></span
          ><span class="text-black-300"> - {{ item.date }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "GridBlog",
  props: {
    heading: String,
    articles: Array,
    images: Array,
    dates: Array,
    urls: Array
  },
  setup(props) {
    const articles = props?.articles?.map((article, i) => {
      return {
        url: props.urls[i],
        title: article.title,
        author: article.author,
        test: article.published_at,
        image: props.images[i],
        date: props.dates[i],
        formatAuthor() {
          let names = article.author.split(' ');
          if(theme.utils.isDevice('mobile') && names.length > 1) {
            let firstName = names[0];

            firstName = firstName.length > 10 ? firstName.charAt(0) + '.' : firstName;

            return firstName + ' ' + names[names.length - 1].charAt(0) + '.';
          }
          return article.author;
          }
        }
    })
    return {
      articles
    }
  }
};
</script>
