"use client";

import React, { useEffect, useRef } from "react";
import styles from "../styles/leaves.module.scss";

const FallingLeaves = ({ isRightToLeft = true }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const LeafScene = function (el, isRightToLeft) {
      this.viewport = el;
      this.world = document.createElement("div");
      this.leaves = [];

      this.options = {
        numLeaves: 10,
        wind: {
          magnitude: 2,
          maxSpeed: 12,
          duration: 500,
          start: 5,
          speed: 0,
        },
      };

      this.width = this.viewport.offsetWidth;
      this.height = this.viewport.offsetHeight;

      this.timer = 0;

      this._resetLeaf = function (leaf) {
        if (isRightToLeft) {
          // Start leaves from the right side
          leaf.x = this.width + Math.random() * this.width;
          leaf.y = -10;
          leaf.z = Math.random() * 200;
          if (leaf.x > this.width) {
            leaf.x = this.width + 10;
            leaf.y = (Math.random() * this.height) / 2;
          }
        } else {
          // Start leaves from the left side
          leaf.x = -Math.random() * this.width * 1.75;
          leaf.y = -10;
          leaf.z = Math.random() * 200;
          if (leaf.x < 0) {
            leaf.x = -10;
            leaf.y = (Math.random() * this.height) / 2;
          }
        }
        if (this.timer === 0) {
          leaf.y = Math.random() * this.height;
        }

        leaf.rotation.speed = Math.random() * 10;
        const randomAxis = Math.random();
        if (randomAxis > 0.5) {
          leaf.rotation.axis = "X";
        } else if (randomAxis > 0.25) {
          leaf.rotation.axis = "Y";
          leaf.rotation.x = Math.random() * 180 + 90;
        } else {
          leaf.rotation.axis = "Z";
          leaf.rotation.x = Math.random() * 360 - 180;
          leaf.rotation.speed = Math.random() * 3;
        }

        leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
        leaf.ySpeed = Math.random() + 1.5;

        // Set z-index based on depth
        leaf.zIndex = Math.floor((200 - leaf.z) / 66) + 1; // zIndex 0 for far, 1 for mid, 2 for close

        return leaf;
      };

      this._updateLeaf = function (leaf) {
        const leafWindSpeed = this.options.wind.speed(
          this.timer - this.options.wind.start,
          leaf.y
        );

        const xSpeed = leafWindSpeed + leaf.xSpeedVariation;
        leaf.x += isRightToLeft ? -xSpeed : xSpeed; // Move left to right if not isRightToLeft, otherwise right to left
        leaf.y += leaf.ySpeed;
        leaf.rotation.value += leaf.rotation.speed;

        let t = `translateX(${leaf.x}px) translateY(${leaf.y}px) translateZ(${leaf.z}px) rotate${leaf.rotation.axis}(${leaf.rotation.value}deg)`;
        if (leaf.rotation.axis !== "X") {
          t += ` rotateX(${leaf.rotation.x}deg)`;
        }
        leaf.el.style.transform = t;
        leaf.el.style.zIndex = leaf.zIndex; // Apply z-index
        leaf.el.style.position = "absolute";

        if (
          (isRightToLeft && leaf.x < -10) ||
          (!isRightToLeft && leaf.x > this.width + 10) ||
          leaf.y > this.height + 10
        ) {
          this._resetLeaf(leaf);
        }
      };

      this._updateWind = function () {
        if (
          this.timer === 0 ||
          this.timer > this.options.wind.start + this.options.wind.duration
        ) {
          this.options.wind.magnitude =
            Math.random() * this.options.wind.maxSpeed;
          this.options.wind.duration =
            this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
          this.options.wind.start = this.timer;

          const screenHeight = this.height;

          this.options.wind.speed = function (t, y) {
            const a =
              ((this.magnitude / 2) * (screenHeight - (2 * y) / 3)) /
              screenHeight;
            return (
              a *
                Math.sin(
                  ((2 * Math.PI) / this.duration) * t + (3 * Math.PI) / 2
                ) +
              a
            );
          };
        }
      };
    };

    LeafScene.prototype.init = function () {
      for (let i = 0; i < this.options.numLeaves; i++) {
        const leaf = {
          el: document.createElement("div"),
          x: 0,
          y: 0,
          z: 0,
          rotation: {
            axis: "X",
            value: 0,
            speed: 0,
            x: 0,
          },
          xSpeedVariation: 0,
          ySpeed: 0,
          path: {
            type: 1,
            start: 0,
          },
          image: 1,
        };
        this._resetLeaf(leaf);
        this.leaves.push(leaf);
        this.world.appendChild(leaf.el);
      }

      this.world.className = styles["leaf-scene"];
      this.viewport.appendChild(this.world);

      this.world.style.perspective = "400px";

      const self = this;
      window.onresize = function () {
        self.width = self.viewport.offsetWidth;
        self.height = self.viewport.offsetHeight;
      };
    };

    LeafScene.prototype.render = function () {
      this._updateWind();
      for (let i = 0; i < this.leaves.length; i++) {
        this._updateLeaf(this.leaves[i]);
      }

      this.timer++;

      requestAnimationFrame(this.render.bind(this));
    };

    const leafContainer = containerRef.current;
    const leaves = new LeafScene(leafContainer, isRightToLeft);

    leaves.init();
    leaves.render();
  }, [isRightToLeft]);

  return <div className={styles["falling-leaves"]} ref={containerRef}></div>;
};

export default FallingLeaves;
