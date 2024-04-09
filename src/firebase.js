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
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { firebaseConfig } from "./firebaseconfig.js";

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const moviesCollection = collection(db, "movies");
const reviewsCollection = collection(db, "reviews");

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

export const createReview = async (review) => {
  try {
    const querySnapshot = await getDocs(reviewsCollection);
    const reviews = querySnapshot.docs.map((doc) => doc.data());
    const existingReview = reviews.find((m) => m.movieId === review.movieId);

    if (existingReview) {
      console.log(
        "Review with the same movie ID already exists:",
        existingReview
      );
      return;
    }

    const docRef = await addDoc(reviewsCollection, review);
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

export const getAllReviews = async () => {
  try {
    const snapshot = await getDocs(reviewsCollection);
    const reviews = snapshot.docs.map((doc) => ({
      movieId: doc.id,
      ...doc.data(),
    }));
    return reviews;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getReview = async (movieId) => {
  try {
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("movieId", "==", movieId)
    );
    const reviewSnapshot = await getDocs(reviewsQuery);

    if (!reviewSnapshot.empty) {
      const reviewDoc = reviewSnapshot.docs[0];
      const reviewData = reviewDoc.data();

      return {
        id: reviewDoc.id,
        ...reviewData,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving review:", error);
    throw error;
  }
};

export const getMovie = async (movieId) => {
  try {
    const moviesQuery = query(
      collection(db, "movies"),
      where("id", "==", movieId)
    );
    const movieSnapshot = await getDocs(moviesQuery);

    if (!movieSnapshot.empty) {
      const movieDoc = movieSnapshot.docs[0];
      const movieData = movieDoc.data();

      return {
        id: movieDoc.id,
        ...movieData,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving movie:", error);
    throw error;
  }
};

export const getCurrentMovie = async () => {
  try {
    const docRef = doc(db, "currentmovie", "theMovie");
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const currentMovieData = {
        movieId: docSnapshot.id,
        ...docSnapshot.data(),
      };
      console.log(currentMovieData);
      return currentMovieData;
    } else {
      console.error("Current movie not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching current movie:", error);
    return null;
  }
};
