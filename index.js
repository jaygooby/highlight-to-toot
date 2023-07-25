/*!
 * Highligh to Tweet 
 * https://github.com/AlbertoMontalesi/highlight-to-tweet
 *
 * Copyright 2020 Alberto Montalesi
 * Released under the MIT license
 */

;module.exports = (options) => {
    document.addEventListener('DOMContentLoaded', () => {

        window.tweetHighlighted = (options = {}) => {

            const settings = {
                node: options.node || "<a href='#'>Toot this</a>",
                cssClassess: options.cssClassess || null,
                extra: options.extra || '',
                maxLength: options.maxLength || 280,    
                via: options.via || null,
                popupArgs: options.popArgs || 'width=400,height=400,toolbar=0,location=0',
                callback: options.callback || null,
            }

            const tweetIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path transform="scale(0.09)" d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915"/></svg>`;

            const shareButton = document.createElement('div');

            shareButton.style.display = 'none';
            shareButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(url, '_blank', settings.popupArgs);
                if (settings.callback != null) {
                    settings.callback(text);
                }
            })
            let text = '';
            let url = '';
            const body = document.querySelector('body');
            body.appendChild(shareButton);

            const fadeOut = (element) => {
                // TODO: to animate
                element.style.opacity = 0;
            }

            const fadeIn = (element) => {
                // TODO: to animate
                element.style.opacity = 1;
            }

            const getSelectedText = () => {
                if (window.getSelection) {
                    return window.getSelection().toString();
                } else if (document.selection) {
                    return document.selection.createRange().text;
                }
                return '';
            };

            document.addEventListener('mouseup', (e) => {
                text = getSelectedText();
                const btnExists = shareButton.style.display !== 'none';
                if (btnExists || !text.length){
                    return;
                } else {
                    appendShareButton(e)
                }
            })


            document.addEventListener('click', (e) => {
                const text = getSelectedText();
                if (text !== '') {
                    e.stopPropagation();
                }
                else {
                    fadeOut(shareButton);
                    shareButton.style.display = 'none';
                }
            });
            const getTweetURL = function (text, extra, via) {
                let url = 'https://mastodon.social/share?text=';
                // trim the text to fit in the max allowed 280 characters
                const viaUrl = `&via=${via}`;
                const maxLength = settings.maxLength > 280 ? 280 : settings.maxLength;
                const maxAllowedLength = maxLength - viaUrl.length - extra.length;
                let textToTweet = text;
                if(text.length > maxAllowedLength){
                    textToTweet = text.substring(0,maxAllowedLength -1);
                }
                url += encodeURIComponent(textToTweet);
                if (extra)
                    url += encodeURIComponent(' ' + extra);

                if (via)
                    url += viaUrl

                return url;
            };


            const appendShareButton = (e) => {
               
                url = getTweetURL(text, settings.extra, settings.via);

                shareButton.innerHTML = '';
                shareButton.innerHTML += settings.node;
                shareButton.innerHTML += tweetIcon;
                if(settings.cssClassess && settings.cssClassess.length){
                    shareButton.classList.add(settings.cssClassess);
                }
                shareButton.style.top = `${e.pageY}px`;
                shareButton.style.left = `${e.pageX}px`;
                shareButton.style.position = 'absolute';
                shareButton.style.cursor = 'pointer';
                shareButton.style.display = 'flex';
                shareButton.style.justifyContent = 'space-between';
                shareButton.style.alignContent = 'center';
                shareButton.style.alignItems = 'center';

                if (!options.cssClassess) {
                    // default style
                    shareButton.style.fontFamily = 'Arial, Helvetica, sans-serif';
                    shareButton.style.backgroundColor = '#3898EC';
                    shareButton.style.padding = '10px 15px';
                    shareButton.style.width = '100px'
                    shareButton.style.borderRadius = '5px';
                    shareButton.style.color = 'white';
                    shareButton.firstChild.style.color = 'white';
                    shareButton.firstChild.style.textDecoration = 'none';
                    shareButton.lastChild.style.fill = 'white';
                }
                fadeIn(shareButton);
            }


        }
        window.tweetHighlighted(options)
    })

}
