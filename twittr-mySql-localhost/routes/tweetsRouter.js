const express = require("express");
const tweetsService = require("../services/tweetsService");

const router = express.Router();

router.get("/", getTweets);
router.post("/", createTweet);
router.get("/:tweetId", getTweet);
router.delete("/:tweetId", deleteTweet);
router.patch("/:tweetId", updateTweet);

module.exports = router;

async function getTweets(req, res) {
  try {
    const tweets = await tweetsService.getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener los tweets" });
  }
}

async function createTweet(req, res) {
  try {
    const tweet = req.body;
    const result = await tweetsService.createTweet(tweet);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al crear el tweet" });
  }
}

async function getTweet(req, res) {
  try {
    const { tweetId } = req.params;
    const tweet = await tweetsService.getTweet(tweetId);
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tweet." });
  }
}

async function deleteTweet(req, res) {
  try {
    const { tweetId } = req.params;
    const deletedRows = await tweetsService.deleteTweet(tweetId);

    if (deletedRows > 0) {
      res.status(200).json({ message: "Tweet eliminado" });
    } else {
      res.status(404).json({ message: "Tweet no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tweet" });
  }
}

async function updateTweet(req, res) {
  try {
    const { tweetId } = req.params;
    const { content } = req.body;
    const updatedTweet = await tweetsService.updateTweet(tweetId, content);

    if (updatedTweet) {
      // Comprobar si updatedTweet existe (no es null o undefined)
      res
        .status(200)
        .json({ message: "Tweet actualizado", tweet: updatedTweet });
    } else {
      // Este caso ya no debería ocurrir, ya que el servicio lanza un error 404 si no se encuentra el tweet.
      // Se deja por precaución o para un manejo de errores más específico si fuera necesario.
      res.status(404).json({ message: "Tweet no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tweet" });
  }
}
