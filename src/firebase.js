import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore/lite";
import { firebaseConfig } from "./firebaseconfig.js";

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const moviesCollection = collection(db, "movies");

export const createMovie = async (movie) => {
  try {
    const querySnapshot = await getDocs(moviesCollection);
    const movies = querySnapshot.docs.map((doc) => doc.data());
    const existingMovie = movies.find((m) => m.id === movie.id);

    if (existingMovie) {
      console.log("Movie with the same ID already exists:", existingMovie);
      return;
    }

    const docRef = await addDoc(moviesCollection, movie);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const moviesQuery = query(
      collection(db, "movies"),
      where("id", "==", movieId)
    );
    const querySnapshot = await getDocs(moviesQuery);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Movie deleted successfully");
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const markAsWatched = async (movieId) => {
  try {
    const moviesQuery = query(
      collection(db, "movies"),
      where("id", "==", movieId)
    );
    const querySnapshot = await getDocs(moviesQuery);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        watched: 1,
      });

      console.log("Movie marked as watched successfully.");
    });
  } catch (error) {
    console.error("Error marking movie as watched:", error);
    throw error;
  }
};

export const getAllMovies = async () => {
  try {
    const snapshot = await getDocs(moviesCollection);
    const movies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
