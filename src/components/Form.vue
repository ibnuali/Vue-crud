<template>
  <layout>
    <h2 class="text-center">{{ isEdit ? "Edit" : "Create" }} Note</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-primary" to="/">All Notes</router-link>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label htmlFor="name">Name</label>
            <input
              v-model="note.title"
              type="text"
              :disabled="isFetching || isSaving"
              class="form-control"
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div class="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              v-model="note.description"
              type="text"
              :disabled="isFetching || isSaving"
              class="form-control"
              id="description"
              rows="3"
              placeholder="Enter description"
            ></textarea>
          </div>
          <button
            @click="handleSave()"
            :disabled="isFetching || isSaving"
            type="button"
            class="btn btn-outline-primary mt-3"
          >
            {{ isEdit ? "Edit" : "Save" }} Note
          </button>
        </form>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import axios from "axios";
import Layout from "../components/Layout.vue";

export default {
  name: "Form",
  components: {
    Layout,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params.id;
      this.isFetching = true;
      axios
        .get(`https://note-be-blush.vercel.app/api/v1/note/${id}`)
        .then((response) => {
          this.note = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isFetching = false;
        });
    }
  },
  data() {
    return {
      note: {
        title: "",
        description: "",
      },
      isSaving: false,
      isFetching: false,
    };
  },

  methods: {
    async handleSave() {
      this.isSaving = true;
      try {
        await axios.post(
          "https://note-be-blush.vercel.app/api/v1/note",
          this.note
        );
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.isSaving = false;
        this.note.title = "";
        this.note.description = "";
      }
    },
  },
};
</script>
