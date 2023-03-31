//Biblioteka dotenv służy do ładowania zmiennych środowiskowych z pliku .env do aplikacji w języku JavaScript/TypeScript.
//Funkcja config() wczytuje zmienne środowiskowe z pliku .env i dodaje je do obiektu process.env, który jest dostępny w całej aplikacji. Dzięki temu możemy korzystać z wartości zmiennych środowiskowych, takich jak klucze API, adresy URL, hasła czy konfiguracje innych usług, bez potrzeby wprowadzania ich ręcznie w kodzie aplikacji.
import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

//poniżej tworzenie instancji klienta OpenAI API z użyciem klucza API przekazanego jako zmienna środowiskowa process.env.API_KEY. W tym przykładzie tworzona jest instancja obiektu OpenAIApi z konfiguracją, w której apiKey jest ustawiony na wartość zmiennej środowiskowej API_KEY.

const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.API_KEY,
	})
);

//wywołanie metody createChatCompletion z użyciem klienta OpenAI, który został stworzony wcześniej.
//Metoda ta służy do generowania odpowiedzi na podstawie zadanego tekstu wejściowego, zgodnie z modelem językowym wskazanym w parametrze model.
//w tablicy messages podajemy wiadomość użytkownika (z rolą "user") "Hello chatGPT". Po wywołaniu metody, OpenAI zwraca odpowiedź, którą wypisujemy w konsoli za pomocą console.log.

const userInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async input => {
	const res = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: input }],
	});
	console.log("\n" + res.data.choices[0].message.content + "\n") 
    userInterface.prompt(); 
});
