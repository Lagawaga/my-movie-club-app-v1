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

const firebaseConfig = {
  apiKey: "AIzaSyDgdu5_gt8unUPB1sNzM1M4r5OqS5Q5-1g",
  authDomain: "movie-app-2f6bf.firebaseapp.com",
  projectId: "movie-app-2f6bf",
  storageBucket: "movie-app-2f6bf.appspot.com",
  messagingSenderId: "1074280876139",
  appId: "1:1074280876139:web:dd92fea9e7934786d7c92e",
  measurementId: "G-ZTE442HJJM",
};

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
    // Query the movies collection to find the document with the given movie ID
    const moviesQuery = query(
      collection(db, "movies"),
      where("id", "==", movieId)
    );
    const querySnapshot = await getDocs(moviesQuery);

    // Iterate through the query results
    querySnapshot.forEach((doc) => {
      // Delete the movie document
      deleteDoc(doc.ref);
      console.log("Movie deleted successfully");
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error; // Re-throw the error to handle it in the calling code
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
        watched: 1, // Set the watched property to 1
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
    return []; // Return empty array in case of error
  }
};
