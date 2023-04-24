import React, { useEffect, useRef, useState } from "react";
import config from "../config.json";

export default function Intro() {
  const word = config["title"];
  const word2 = config["title"];

  useEffect(() => {
    // handling colours of dark mode
    const mode = localStorage.getItem("joy-mode");
    if (mode === "dark") {
      document.getElementById("right-side").style.backgroundColor =
        "rgb(73 156 132)";
      document.getElementById("left-side").style.backgroundColor =
        "rgb(20 68 87)";
    }

    const left = document.getElementById("left-side");
    const handleMove = (e) => {
      left.style.width = `calc(${(e.clientX / window.innerWidth) * 100}%)`;
    };
    document.onmousemove = (e) => handleMove(e);
    document.ontouchmove = (e) => handleMove(e.touches[0]);

    var interv = "undefined";
    var canChange = false;
    var globalCount = 0;
    var count = 0;
    var INITIAL_WORD = config["title"];
    var isGoing = false;

    var interv2 = "undefined";
    var canChange2 = false;
    var globalCount2 = 0;
    var count2 = 0;
    var INITIAL_WORD2 = config["title"];

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomLetter() {
      var alphabet = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      return alphabet[rand(0, alphabet.length - 1)];
    }
    function getRandomWord(word) {
      var text = config["title"];

      var finalWord = "";
      for (var i = 0; i < text.length; i++) {
        finalWord += text[i] === " " ? " " : getRandomLetter();
      }

      return finalWord;
    }

    function init() {
      if (isGoing) return;
      isGoing = true;
      var randomWord = getRandomWord(word);
      document.getElementsByClassName("hacker")[0].innerHTML = randomWord;

      interv = setInterval(function () {
        var finalWord = "";
        for (var x = 0; x < INITIAL_WORD.length; x++) {
          if (x <= count && canChange) {
            finalWord += INITIAL_WORD[x];
          } else {
            finalWord += getRandomLetter();
          }
        }
        document.getElementsByClassName("hacker")[0].innerHTML = finalWord;
        if (canChange) {
          count++;
        }
        if (globalCount >= 20) {
          canChange = true;
        }
        if (count >= INITIAL_WORD.length) {
          clearInterval(interv);
          count = 0;
          canChange = false;
          globalCount = 0;
          isGoing = false;
        }
        globalCount++;
      }, 40);

      var randomWord2 = getRandomWord(word2);
      document.getElementsByClassName("hacker")[1].innerHTML = randomWord2;

      interv2 = setInterval(function () {
        var finalWord2 = "";
        for (var x = 0; x < INITIAL_WORD2.length; x++) {
          if (x <= count2 && canChange2) {
            finalWord2 += INITIAL_WORD2[x];
          } else {
            finalWord2 += getRandomLetter();
          }
        }
        document.getElementsByClassName("hacker")[1].innerHTML = finalWord2;
        if (canChange2) {
          count2++;
        }
        if (globalCount2 >= 20) {
          canChange2 = true;
        }
        if (count2 >= INITIAL_WORD2.length) {
          clearInterval(interv2);
          count2 = 0;
          canChange2 = false;
          globalCount2 = 0;
        }
        globalCount2++;
      }, 40);
    }

    document.body.onmousemove = function (e) {
      document.documentElement.style.setProperty(
        "--x",
        e.clientX + window.scrollX + "px"
      );
      document.documentElement.style.setProperty(
        "--y",
        e.clientY + window.scrollY + "px"
      );
    };

    init();
  }, []);

  return (
    <div className="main-container">
      <div className="effect-container">
        <div id="left-side" className="side">
          <h2 className="title">
            <p className="hacker hacker-left">{config["title"]}</p>
          </h2>
          <div className="desc">{config["description"]}</div>
        </div>
        <div id="right-side" className="side">
          <h2 className="title">
            <p className="hacker hacker-right">{config["title"]}</p>
          </h2>
          <div className="desc">{config["description"]}</div>
        </div>
      </div>
    </div>
  );
}
