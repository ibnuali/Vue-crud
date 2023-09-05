<template>
  <div class="container">
    <h2 class="text-center mt-5 mb-3">Note App</h2>
    <div class="card">
      <div class="card-header">
        <router-link to="/create" class="btn btn-outline-primary"
          >Create New Note
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th width="240px">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="note in notes" :key="note.id">
              <td>{{ note.title }}</td>
              <td>{{ note.description }}</td>
              <td>
                <router-link
                  :to="`/edit/${note.id}`"
                  class="btn btn-outline-success mx-1"
                  >Edit</router-link
                >
                <button
                  class="btn btn-outline-danger mx-1"
                  @click="deleteNote(note.id)"
                  :disabled="loading"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Layout from "../components/Layout.vue";

interface INote {
  id: number;
  title: string;
  description: string;
}

export default {
  name: "NotesList",
  components: {
    Layout,
  },
  data() {
    return {
      notes: [] as INote[],
      loading: false,
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        await axios
          .get("https://note-be-blush.vercel.app/api/v1/note")
          .then((response) => {
            this.notes = response.data.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    deleteNote: async function (id: number) {
      if (this.loading) return;
      this.loading = true;
      try {
        await axios
          .delete(`https://note-be-blush.vercel.app/api/v1/note/${id}`)
          .then(() => {
            this.fetchNotes();
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
