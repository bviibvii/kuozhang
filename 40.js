class Hash {
  // 初始化 MD5 缓冲区
  initializeBuffer() {
    return {
      a: 0x67452301,
      b: 0xefcdab89,
      c: 0x98badcfe,
      d: 0x10325476
    };
  }

  // 将字符串转换为UTF-8字节数组
  stringToBytes(str) {
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(str));
  }

  // 填充消息
  padMessage(bytes, originalBitLength) {
    const padding = [0x80]; // 添加一个1
    while ((bytes.length + padding.length) % 64 !== 56) {
      padding.push(0x00); // 填充0
    }
    
    // 处理长度的小端序存储
    const paddedBytes = bytes.concat(padding);
    const low = originalBitLength & 0xFFFFFFFF;
    const high = (originalBitLength >>> 32) & 0xFFFFFFFF;

    // 添加小端序长度字节
    for (let i = 0; i < 4; i++) {
      paddedBytes.push((low >>> (i * 8)) & 0xFF);
    }
    for (let i = 0; i < 4; i++) {
      paddedBytes.push((high >>> (i * 8)) & 0xFF);
    }

    return paddedBytes;
  }

  // 将字节数组转换为32位小端序整数数组
  bytesToWords(bytes) {
    const words = [];
    for (let i = 0; i < bytes.length; i += 4) {
      words.push(
        bytes[i] |
        (bytes[i + 1] << 8) |
        (bytes[i + 2] << 16) |
        (bytes[i + 3] << 24)
      );
    }
    return words;
  }

  // MD5 主循环
  md5MainLoop(blocks) {
    const buffer = this.initializeBuffer();
    const T = Array.from({length: 64}, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000));

    // 修正后的移位表
    const shifts = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
      5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
      4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
      6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];

    for (let i = 0; i < blocks.length; i += 16) {
      let [a, b, c, d] = [buffer.a, buffer.b, buffer.c, buffer.d];

      for (let j = 0; j < 64; j++) {
        let f, g;
        if (j < 16) {
          f = (b & c) | (~b & d);
          g = j;
        } else if (j < 32) {
          f = (b & d) | (c & ~d);
          g = (5 * j + 1) % 16;
        } else if (j < 48) {
          f = b ^ c ^ d;
          g = (3 * j + 5) % 16;
        } else {
          f = c ^ (b | ~d);
          g = (7 * j) % 16;
        }

        // 正确的变量轮换逻辑
        const temp = a + f + blocks[i + g] + T[j];
        const rotated = this.rotateLeft(temp, shifts[j]);
        const newVal = b + rotated;

        // 更新变量
        [a, b, c, d] = [d, newVal, b, c];
      }

      buffer.a = this.add32(buffer.a, a);
      buffer.b = this.add32(buffer.b, b);
      buffer.c = this.add32(buffer.c, c);
      buffer.d = this.add32(buffer.d, d);
    }

    return this.toHex(buffer);
  }

  // 辅助函数
  rotateLeft(value, bits) { 
    return (value << bits) | (value >>> (32 - bits));
  }
  
  add32(a, b) { 
    return (a + b) >>> 0; // 使用无符号右移确保32位
  }
  
  toHex(buffer) {
    return [
      this.wordToHex(buffer.a),
      this.wordToHex(buffer.b),
      this.wordToHex(buffer.c),
      this.wordToHex(buffer.d)
    ].join('');
  }
  
  wordToHex(word) {
    const hex = [];
    for (let i = 0; i < 4; i++) {
      hex.push((word >>> (i * 8)).toString(16).padStart(2, '0'));
    }
    return hex.reverse().join('');
  }

  // 计算 MD5 哈希值
  md5(originalText) {
    const bytes = this.stringToBytes(originalText);
    const originalBitLength = bytes.length * 8;
    const paddedBytes = this.padMessage(bytes, originalBitLength);
    const blocks = this.bytesToWords(paddedBytes);
    return this.md5MainLoop(blocks);
  }

  hash(message, method="SHA-256") {
    return this.SHA(message, method);
  }

  async SHA(message, method="SHA-256") {
    const msgBuffer = new TextEncoder().encode(message); // 将字符串编码为UTF-8字节数组
    const hashBuffer = await crypto.subtle.digest(method, msgBuffer); // 计算哈希值
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // 将哈希值转换为数组
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // 转换为十六进制字符串
    return hashHex;
  }
}

class HashAndEncrypt {
  getInfo() {
    return {
      id: "hashAndEncrypt",
      name: "哈希与加密",
      color1: "#4D7EB4",
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
        },
        {
          opcode: "哈希",

          blockType: Scratch.BlockType.REPORTER,

          text: "哈希 [METHOD] [TEXT]",

          arguments: {
            METHOD: {
              type: Scratch.ArgumentType.OPTION,
              acceptReporters: true,
              menu: "HashMethod"
            },

            TEXT: {
              type: Scratch.ArgumentType.STRING,

              defaultValue: "Hello world!"
            },
          },

          func: "hash",
        }
      ],

      menus: {
        HashMethod: {
          acceptReporters: false,
          items: [
            {text: "SHA-1", value: "SHA-1"},
            {text: "SHA-256", value: "SHA-256"},
            {text: "SHA-384", value: "SHA-384"},
            {text: "SHA-512", value: "SHA-512"},
          ]
        }
      },

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
    const hash = new Hash();
    return hash.md5(args.TEXT.toString());
  }

  // 实现SHA-256哈希计算
  hash(args) {
    return new Hash().hash(args.TEXT.toString(), args.METHOD.toString());
  }
}

/** dont forget register your extension to Scratch */
Scratch.extensions.register(new HashAndEncrypt());
