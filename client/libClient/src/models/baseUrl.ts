import {LibraryClient} from "../models/generated-client";

const isProduction = import.meta.env.PROD;

const prod = "https://server-withered-library-3067.fly.dev";
const dev = "http://localhost:5028";

export const finalUrl = isProduction ? prod : dev;

export const libraryClient = new LibraryClient(finalUrl)