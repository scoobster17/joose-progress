# Joose Progress Component

A lightweight, minimal and basic styled progress component. This component belongs to the Joose component library, but can be used completely independently.

Please see [joose](https://github.com/scoobster17/joose) for the whole component library.

The package includes a basic CSS file (along with source Sass files) to handle the basic positioning of content as an example. No styling has been applied other than simple styles. This means you can utilise the existing HTML/CSS as per the example, or you can add your own classes / selectors of your choice and customise as you wish, for example to add animations or effects.

## Installation

To install this component independently using [bower](http://bower.io/search/?q=joose-progress) use the following command:

`bower install joose-progress` (Please note this is not yet active and only a demonstration)

To install this component independently using [npm](https://www.npmjs.com/package/joose-progress) use the following command:

`npm install joose-progress` (Please note this is not yet active and only a demonstration)

## Usage

The progress representation(s) can be initialised in two different ways  
`var componentProgress = new joose.classes.Progress('progressContainer', 'radial', 'percentage', true);`  
or  
`<section id="progressContainer" data-component="progress" direction="radial" data-continuous="true" data-description="percentage">`

On page load the script searches the page for the `data-component` attribute to pick up any components that haven't been manually initialised using the `new` keyword as demonstrated above.

Here is an example of the HTML required for the progress representation:

```html
<section id="progressHorizontal" data-component="progress" data-direction="horizontal" data-continuous="true" data-description="percentage">
    <div></div>
    <div></div>
    <p>0%</p>
</section>
```