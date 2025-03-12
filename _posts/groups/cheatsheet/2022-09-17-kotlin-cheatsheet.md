---
layout: post
title: "kotlin cheatsheet"
date: 2022-09-17
tags: kotlin cheatsheet
---

# Scope function

| Function | Object reference | Return value     | Is extension function                       |
|----------|------------------|------------------|---------------------------------------------|
| let      | it               | Lambda result    | Yes                                         |
| run      | this             | Lambda result    | Yes                                         |
| run      | -                | Lambda result    | No: called without the context object       |
| with     | this             | Lambda result    | No: takes the context object as an argument |
| apply    | this             | Object reference | Yes                                         |
| also     | it               | Object reference | Yes                                         |

``` kotlin
        var expect = ""
        expect =
            with("hello") { // inline fun <T, R> with(receiver: T, block: T.() -> R): R {
                logger.info("$this, world")
                return@with substring(0, 3) + "with"
            }
        Assertions.assertEquals("helwith", expect)

        expect =
            "hello".also { // inline fun <T> T.also(block: (T) -> Unit): T
                logger.info("$it, world")
            }
        Assertions.assertEquals("hello", expect)

        expect =
            "hello".apply { // inline fun <T> T.apply(block: T.() -> Unit): T
                logger.info("$this, world")
            }
        Assertions.assertEquals("hello", expect)

        expect =
            "hello".let { // inline fun <T, R> T.let(block: (T) -> R): R
                logger.info("$it, world")
                return@let it.substring(0, 3) + "let"
            }
        Assertions.assertEquals("hellet", expect)

        expect =
            "hello".run { // inline fun <T, R> T.run(block: T.() -> R): R
                logger.info("$this, world")
                return@run substring(0, 3) + "run"
            }
        Assertions.assertEquals("helrun", expect)

        expect = run { // inline fun <T, R> T.run(block: T.() -> R): R
            val hello = "hello"
            logger.info("$hello, world")
            hello
        }
        Assertions.assertEquals("hello", expect)
```



# deployment status


		



* [Kotlin에서 자주 사용하는 annotation 정리](https://codechacha.com/ko/kotlin-annotations/)
    * @JvmName, @JvmStatic, @JvmField, @Throws, @JvmOverloads





