class Hash {
  constructor() {}

  static md5(input) {
    function F(x, y, z) {
      return (x & y) | (~x & z);
    }
    function G(x, y, z) {
      return (x & z) | (y & ~z);
    }
    function H(x, y, z) {
      return x ^ y ^ z;
    }
    function I(x, y, z) {
      return y ^ (x | ~z);
    }

    function rotateLeft(value, bits) {
      return (value << bits) | (value >>> (32 - bits));
    }

    function add32(a, b) {
      return (a + b) & 0xFFFFFFFF;
    }

    function finalize(buffer) {
      let hex = '';
      for (const value of Object.values(buffer)) {
        hex += value.toString(16).padStart(8, '0');
      }
      return hex;
    }

    function padding(input) {
      const inputBytes = new Uint8Array(input.length);
      for (let i = 0; i < input.length; i++) {
        inputBytes[i] = input.charCodeAt(i);
      }
      let inputLength = inputBytes.length * 8;
      let paddedInput = new Uint8Array(inputLength + 1 + 64);
      paddedInput.set(inputBytes);
      paddedInput[inputLength] = 0x80;

      while (paddedInput.length % 64 !== 56) {
        paddedInput = new Uint8Array(paddedInput.length + 1);
        paddedInput.set(paddedInput.subarray(0, paddedInput.length - 1));
        paddedInput[paddedInput.length - 1] = 0;
      }

      const lengthBytes = new Uint32Array(2);
      lengthBytes[0] = (inputLength >>> 32) & 0xFFFFFFFF;
      lengthBytes[1] = inputLength & 0xFFFFFFFF;
      paddedInput.set(lengthBytes, paddedInput.length - 8);

      return paddedInput;
    }

    function initializeBuffer() {
      return {
        a: 0x67452301,
        b: 0xEFCDAB89,
        c: 0x98BADCFE,
        d: 0x10325476
      };
    }

    function initializeBlocks(paddedInput) {
      const blocks = [];
      for (let i = 0; i < paddedInput.length; i += 64) {
        const block = [];
        for (let j = 0; j < 64; j++) {
          block.push(paddedInput[i + j]);
        }
        blocks.push(block);
      }
      return blocks;
    }

    function mainLoop(blocks) {
      const buffer = initializeBuffer();
      for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        let a = buffer.a;
        let b = buffer.b;
        let c = buffer.c;
        let d = buffer.d;
        let f, k, s, t;

        for (let j = 0; j < 64; j++) {
          if (j < 16) {
            f = F(b, c, d);
            k = j;
          } else if (j < 32) {
            f = G(b, c, d);
            k = (5 * j + 1) % 16;
          } else if (j < 48) {
            f = H(b, c, d);
            k = (3 * j + 5) % 16;
          } else {
            f = I(b, c, d);
            k = (7 * j) % 16;
          }

          t = add32(add32(add32(a, f), block[k]), (j < 16 ? j : (j < 32 ? (j - 16) * 2 : (j - 32) * 3)));
          a = d;
          d = c;
          c = rotateLeft(b, s = (j < 16 ? 7 : (j < 32 ? 12 : (j < 48 ? 17 : 22))), t);
          b = add32(b, t);
        }

        buffer.a = add32(buffer.a, a);
        buffer.b = add32(buffer.b, b);
        buffer.c = add32(buffer.c, c);
        buffer.d = add32(buffer.d, d);
      }
      return buffer;
    }

    const paddedInput = padding(input);
    const blocks = initializeBlocks(paddedInput);
    const digest = mainLoop(blocks);
    return finalize(digest);
  }
}


class HashAndEncrypt {
  getInfo() {
    return {
      // 必选:此扩展的机器可读名称。
      //将用作扩展的命名空间。不得包含“.”性格。
      id: "hashAndEncrypt",

      // 可选项:字符串形式的此扩展的可读名称。
      //字符串或对“intlDefineMessage”的调用；普通字符串不会被
      //要在临时用户界面中显示的该字符串和任何其他字符串可能是
      //到翻译图(见下图)。“intlDefineMessage”调用是
      //已转换，而对“intlDefineMessage”的调用将连接字符串
      //调用一些扩展支持代码来施展它的魔力。例如，我们将
      //形式上类似于“react-intl”中的“defineMessages ”,但实际上将
      //ID相同但没有冲突的消息。
      //在内部命名消息，这样两个扩展可以有
      //参见:https://github.com/yahoo/react-intl/wiki/API#definemessages
      name: "哈希与加密",
      // block color
      color1: "#4D7EB4",
      // Optional: URI for an icon for this extension. Data URI OK.
      menuIconURI:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DE" +
        "UIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==",
      
      blockIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEtklEQVRoge2ZW4hWVRTHf984Kk1jlj2kI2H2UIwRacVot7EiSLtQBFlPRWUvSQTdsJCCyogy6CWSiMoeqrGioKDJLmpWYxcjxyZSJ4hRuznihZnQRj09rP/unO+b852z9/edT3qYPxz2OXuv9V9rX87Za68DYxhDQ1AqmO9sYAEwDzgDaAMmq20/8BuwDegBuoEfC7Y/CuOAl4HdwAfAyRmy44E7gF4gCrw2A7eLoxpagC758jZwXEhHbqww+FIVuYuBvoTcHuBN4DagA5ghR1p036G2Lsk6vT7goio2llf4cndIR96X0tPAQeCIOpfE/cCI5AaAxUBzgI1m4E7pRuK6t0LmioT9JyT3TYANfpHS6SKPgMPAc8DMBGkErAAmhpBXYCLwbILvcezdekydiICngON1P0TAuz0opTY9P0g8+u76B5uForBYnBE2AxFwFFsVJWACNphHyX6nyrBJRFcm6s4BPiLuyJL6fR+FJQn+dcCFibY5qt8RQuiWzocV9d2qf71WTz3wRhXbq1T/YgjZNOy7HwGPqO4SPR8ATqrH0xxMkY1INgHuwpbUIeDMUMKbpRwBn2BT7b5kjcYK2foUeJcClvMiYG+CaASbrUZjOvZiO7vD2Ke6LpxCvG6/rpcsAN/K5jvAqXnCTR6EfwK/6n5t7X4FY53KrXh8qXw6AvbpBfgipe1qYKeMLfTk89HbUGG7EGzDpnl2StsO4rU8EMCZp3eu2rb6kPnOiAvF93jKF4FBlScWSepinpaUtoXY6A5gZxFf5Om1yObBIE9z4JbAsYa3XZ+ldVp9vhSCun3oAP7ARuXLAL2vdCXPJ83A56oP4YmA34HzA/TK0IntqBEWJrQG6G6R3irsKDAdeE11vQE8rcQhyhDVT5FVMYP4TLKS8CTFfOJBSF7DxIGgL5qwiDcC/sJjl3coYUFiBKzBEhG1YA7wHjYgg9jIpu1DPhiX8OljPAf2Bins5dgEiL5oA/Zhvl3vo7BZwvc10Kla8QDm2/d5gudJcB922P+/oZV4VsqWaeU+cq3K1diL6TAN+A74rEEOpmEtFsonl/cQ8Jbur8tSXoP1NpnDmgn0E395phblaQamJuz1U74hLlJ9dxaBi3Lb9TwZ+JnyT+hlhbqcjssrbP5EHLi2kxIVVy6tKSpd5PkMdtjvA15V3axCXU7HWSpfke124lzBbpVZ+ej/ZuQmLDo9gmUuZgG3qu35Ql1OxwuydYtsH5IvC+Rb7jnlYUbvxg+pbTbhMVet6JEtdzpcmuLX0iyCJmAZ1tte4B7iXXQCNjLDhCWrQzEe+Fu2XGq0JF965dsy/A+FqfiB8pFqBFxqdFOIUmivHPkFgXohmKcyd/dOIrQj7v24NENmPbAdeBSYC5yga67qthOnetIwX2XIuSUYLv+7K0PG97dbNeyiPO9bONqId/j1GXLO0ZXYAeuAri2qy+uIyzH3E/+fKQwlLM6KgI3ApAzZPEfz2ifJhkueF4prRLyf/Fir3o4gG+63xlWePnphtUiXe8gW0RGAJyXX5SHrjZ0i7fSQLaojnQSkYX2TCiOE7+bVuEMTfYfx+Pnpu49sDDS+IaMtLaOfhZ5A+TGMoUj8CyaTiB/WbnspAAAAAElFTkSuQmCC",

      // Optional: Link to documentation content for this extension.
      // If not present, offer no link.
      docsURI: "https://ccw.site",

      // Required: the list of blocks implemented by this extension,
      // in the order intended for display.
      // Scratch object is pera
      blocks: [
        {
          opcode: "base64Encode",

          blockType: Scratch.BlockType.REPORTER,

          text: "base64编码 [TEXT]",

          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,

              defaultValue: "Hello world!"
            },
          },

          func: "base64Encode",
        },
        {
          opcode: "base64Decode",

          blockType: Scratch.BlockType.REPORTER,

          text: "base64解码 [TEXT]",

          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,

              defaultValue: "SGVsbG8gd29ybGQh"
            },
          },

          func: "base64Decode",
        },
        {
          opcode: "base64IsValid",

          blockType: Scratch.BlockType.BOOLEAN,

          text: "base64是否有效 [TEXT]",

          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,

              defaultValue: "Hello world!"
            },
          },

          func: "isValidBase64",
        },
        {
          opcode: "MD5",

          blockType: Scratch.BlockType.REPORTER,

          text: "MD5 [TEXT]",

          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,

              defaultValue: "Hello world!"
            },
          },

          func: "md5",
        }
      ],

      // 可选:翻译
      translation_map: {
        "zh-cn": {
          "hashAndEncrypt.name": "hash and encrypt",
          "someBlocks.setValue": "设置[KEY]=[VALUE]",
          "someBlocks.getValue": "获取[KEY]的值",
        },
        en: {
          "someBlocks.name": "CCW Lab",
          "someBlocks.setValue": "set[KEY]=[VALUE]",
          "someBlocks.getValue": "get[KEY]",
        },
      },
    }
  }

  base64Encode(args) {
    // 将字符串转换为二进制字符串
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(args.TEXT.toString());
    // 将Uint8Array转换为二进制字符串
    const binaryString = String.fromCharCode(...uint8Array);
    // Base64编码
    return window.btoa(binaryString);
  }

  base64Decode(args) {
    try {
      // Base64字符串解码为二进制字符串
      const binaryString = window.atob(args.TEXT.toString());
      // 二进制字符串转换为普通字符串
      const decoder = new TextDecoder();
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      return decoder.decode(uint8Array);
    } catch (error) {
      return "错误的base64";
    }
  }

  isValidBase64(args) {
    try {
      base64Decode(args);
      return true;
    } catch (error) {
      return false;
    }
  }

  md5(args) {
    return Hash.md5(MD5(args.TEXT.toString()));
  }
}

/** dont forget register your extension to Scratch */
Scratch.extensions.register(new HashAndEncrypt())
