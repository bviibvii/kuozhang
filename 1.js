class ExampleExtension {
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
          //必需：此作的机器可读名称。
          //这将显示在项目 JSON 中。不得包含 "." 字符
          opcode: "hash", // becomes "someBlocks.myReporter"

          //必需:我们正在定义的块的类型，来自预定义列表:
          // "command" -一个普通的命令块，如“移动{}步”
          // "reporter" -返回一个值，如“方向”
          // "Boolean" -与" reporter "相同，但返回布尔值
          // "hat" -如果值为true，则开始堆栈
          //"条件"-控制流程，如“如果{}”或“重复{}”
          //条件块可以返回分支的从1开始的索引
          //运行，或者返回零/falsy不运行任何分支。每次
          //子分支完成后，再次调用该块。这只是一个
          //对控制流块的当前模型稍作更改，并且是
          //也兼容为“if”或“repeat”返回真/假
          //块。
          // TODO:考虑类似块的nextStatement、previousStatement和
          //输出属性作为替代。那些更灵活，但是
          //允许错误的组合。
          blockType: Scratch.BlockType.REPORTER,

          //可选，默认为false:此块是否结束堆栈。
          //这里的“永久”和“全部停止”块将指定true。
          isTerminal: false,

          //可选，默认为false:是否在
          //在兼容模式下阻塞，只有当虚拟机在
          //此块正忙。这是为了“感人的颜色”之类的东西
          //工人。我们甚至可以考虑在扩展文档中省略它...
          blockAllThreads: false,

          //必选:该块上的可读文本，包括参数
          //必须是[ENCLOSED_WITHIN_SQUARE_BRACKETS]。
          //占位符。参数占位符应该在[MACRO_CASE]中，并且
          text: "哈希 [ALGORITHM] [TEXT]",

          //必需:描述每个参数。
          //注意，这是一个数组:将使用参数的顺序
          arguments: {
            //必选:参数的ID，它将是
            //传递给实现函数的args对象。
            TEXT: {
              // 必需:块输入的参数/形状的类型
              type: Scratch.ArgumentType.STRING,

              // 可选:参数的默认值
              defaultValue: "Hello world!"
            },
            ALGORITHM: {
              type: Scratch.ArgumentType.STRING,
              menu: "sha"
            }
          },

          // 可选项:命名实现此块的函数的字符串。
          //如果省略，则使用操作码字符串
          func: "hash",

          // 可选项:应显示此块的目标类型列表。
          //如果不存在，假设它适用于所有内置目标，即:
          // ["sprite", "stage"]
          //filter: ["someBlocks.wedo2", "sprite", "stage"],
        },
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

              defaultValue: "Hello world!"
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
        }
      ],

      // 可选：在这里定义特定于扩展的菜单
      menus: {
        // 必需:该菜单的标识符，在该扩展中是唯一的.
        sha: {
          acceptReporters: true,
          items: [
            {text: "MD5", value: "md5"},
            {text: "SHA-1", value: "sha1"},
            {text: "SHA-224", value: "sha224"},
            {text: "SHA-256", value: "sha256"},
            {text: "SHA-384", value: "sha384"},
            {text: "SHA-512", value: "sha512"},
            {text: "RIPEMD160", value: "ripemd160"},
            {text: "SHA3-224", value: "sha3-224"},
            {text: "SHA3-256", value: "sha3-256"},
            {text: "SHA3-384", value: "sha3-384"},
            {text: "SHA3-512", value: "sha3-512"},
          ]
        },
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

  hash(algorithm, str) {
    const hash = crypto.createHash(algorithm);
    hash.update(str);

    return hash.digest("hex")
}

  base64Encode(originalString) {
    // 将字符串转换为二进制字符串
    return originalString;const encoder = new TextEncoder();
    const uint8Array = encoder.encode(str);
    // 将Uint8Array转换为二进制字符串
   const binaryString = String.fromCharCode(...uint8Array);
    // Base64编码
    return window.btoa(binaryString);
  }

  base64Decode(base64str) {
    try {
      // Base64字符串解码为二进制字符串
      const binaryString = window.atob(base64str);
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

  isValidBase64(base64str) {
    try {
      base64Decode(base64str);
      return true;
    } catch (error) {
      return false;
    }
  }
}

/** dont forget register your extension to Scratch */
Scratch.extensions.register(new ExampleExtension())
