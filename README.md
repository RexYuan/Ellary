# What is this?
Ellary is a template for browser-based self-assessment quiz through matching test with questions and answers drawn from a predefined data set.

## Technical stuff
Ellary is primarily based on [React](https://facebook.github.io/react/). It's designed to be served as a static website. I personally like [GitHub Pages](https://pages.github.com/), but you can use other services or host it yourself.

# Ellary in action
Check out some examples!

* [Vocabulary](http://ellary.rexy.xyz/vocab/)
* [USA Presidents](http://ellary.rexy.xyz/president/)
* [NBA Players](http://ellary.rexy.xyz/nba/)

Try out the ergonomically designed keyboard shortcuts: place your digits over these keys!

* <kbd>spc</kbd> goes to the next problem
* <kbd>k</kbd> selects the first option
* <kbd>o</kbd> selects the second option
* <kbd>p</kbd> selects the third option
* <kbd>'</kbd> selects the fourth option

# Set up your own Ellary

Like what I did with the place? Here's how to make it yours!

1. Fork this repo
2. Create branch `gh-pages`
3. Prepare your test bank data in bank.js or use the [banker](http://ellary.rexy.xyz/banker/), a tool to save you some trouble
4. Good to go!

:smile::fireworks::clap::dragon_face::icecream:

# Friendly reminder

* Currently, instead of "multiple choice", Ellary is designed to be a "matching test". Every question-answer pair relation should be a one-to-one correspondence; that is, no more than one question should share a given answer, and no more than one answer should share a given question. The questions and answers should be designed to be under the same context; for example, mixing NBA player and USA president may make the test confusing or even trivial.
*  There must be at least four entries in the test bank, because I make it four options for a given question, but you can edit the code to make it otherwise.
* I only went so far with the responsive design. I am really not an expert in this. Improvements would be appreciated.

# Make Ellary better

To contribute, you can

1. Fork this repo
2. Edit
3. Pull request

# License

Ellary is [Unlicensed](http://unlicense.org/). Do whatever you want.
