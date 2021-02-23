# POST Search Privacy [Chrome extension]

Chrome extension which replaces insecure GET requests (Like `https://search.com/?query=cat+memes`) of search providers with secure POST requests.

**Version:** 1.0.1

**Install via Chrome Web Store:** https://u.nu/gvxy0

### Supported Search Engines

- Startpage
- DuckDuckGo

## Changelog

### 1.0.1

- Fixed [the bug](https://github.com/TensorTom/POST-Search-Privacy/issues/1) which was breaking Startpage searches from the address bar.
- [Added](https://github.com/TensorTom/POST-Search-Privacy/commit/89ef531922034bf83e1f29e5051a3484ffb4b595) dark theme styles to the search loading page so that it looks nicer.
- Made some improvements ([675c642](https://github.com/TensorTom/POST-Search-Privacy/commit/675c642f205f3fddf7968579be1940ceb9f138ca) & [ebe3cbb](https://github.com/TensorTom/POST-Search-Privacy/commit/ebe3cbb9bd0ad7e56ebf404aa5dd56b4a157ce45)) to the [README.md](https://github.com/TensorTom/POST-Search-Privacy/blob/master/README.md) file.
- [Created](https://github.com/TensorTom/POST-Search-Privacy/commit/2c97460576cc8ea7da6e983a3421cfb8cdfe695c) Chrome Web Store tile images.

### 1.0.0

- Initial release version.

## ToDo

- The Chrome Web Store tile image sources were accidentally included in the 1.0.1 distribution .zip file. Once the store approves `1.0.1`, let's remove those files and bump the version to either `1.0.2` or `1.0.1b`.
- Are there other search engines we could add? Let's find out.
- Make the style & text of the loading page configurable.
- Reduce the URL matching rules if more concise are possible by the spec.
- Investigate possibility of changing the HTTP header to POST (Without using [search.html](https://github.com/TensorTom/POST-Search-Privacy/blob/master/src/search.html)) in order to reduce search latency/wait time.

## Motivation

This is a pretty simple yet longstanding problem. We all know that if we visit a site with `https://` in the link, it means our web browser has an encrypted (SSL) connection to the web-site. This is great for securely submitting passwords and other personal data. The problem is, the characters that comprise the URL in a GET request are not private at all.

- POST requests aren't cached by the browser or search history (GET requests are).
- POST requests on an `https` site are hidden from your ISP (GET requests are not).

### GET & POST Requests?

Let's say Alice visits `https://acmebank.com` where she logs into her bank account. To login, she submits a form on the bank's web-site containing her username and password. When she clicks the login/submit button, her username and password are sent securely to `acmebank.com` because:

-   Login forms traditionally use the HTTP (Over HTTPS) method called POST.
-   POST requests (Forms) are transmitted to the website via HTTP headers. If the URL starts with `https://`, the POST request is encrypted. No outside entities (Her ISP, governments, etc.) can directly spy on what Alice submitted. If it had instead been a GET request, Alice would see something like this in her address bar after clicking submit: `https://acmebank.com/login/?user=alice&password=monkey123`.

### Search Engines Use GET? WHY!

It doesn't make much sense, does it? Go to just about any search engine, even the privacy-centric ones (DuckDuckGo, Startpage, etc.), and search for `test123`. You'll see that the address in the address-bar now contains your search query (Like `https://www.startpage.com/do/search?query=test123` ). Congrats. You now have zero privacy of your search habits.

### The Conspiracy

I'd take the odds of a conspiracy here. You have a superior programming method which all web developers know to use by default, yet magically:

- All major search engines, including  the privacy-centric ones (DuckDuckGo & Startpage) use GET requests by default.
- No major web browser, including the privacy-centric one (Brave), supports POST requests for search providers.

It's not like they don't support POST. Both DuckDuckGo and Startpage both support it but it's off by default and not supported by browser search providers. The NSA and British intelligence have clearly infiltrated our search infrastructure.

Hail Hydra (Or don't and use this extension)

### The Simple Solution

The extension monitors your searches in the background. If it sees a GET request being used to search a popular search-engine, it converts it to POST on-the-fly. The extension doesn't keep any records of your search history and can't transmit it anywhere except securely to the engine your searching. Alice's ISP, government, etc. will only see that she visited `https://www.startpage.com/do/search`. Her search query `test123` (And all future searches) is now transmitted securely and privately.

For we who install extensions, problem solved. What about everyone else? Well, there have been massive feature request threads going back several years. I participated in some of them. Here we sit.

## How To Contribute

If you have an idea, feel free to pitch in.

- Create a new branch with a descriptive name. Don't be afraid to use a sentence. Example:

```
GH-1_-_StartPage_search_not_working_from_address_bar
```

- Reference issue numbers in your commit messages. Example (For issue #1):

```
#1 - Added missing startpage endpoints. Removed redundant function.`
```

- Bump the version number appropriately.
- Update the Changelog of [README.md](https://github.com/TensorTom/POST-Search-Privacy/blob/master/README.md) to document what you changed.
- Build the source using:

`yarn build`

- Then, merge your new branch with the `master` branch and submit your PR.

## License: MIT License
