/*
 * Copyright 2015-2018 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    './../KmlElements',
    '../KmlObject',
    '../styles/KmlStyleSelector',
    './NodeTransformers'
], function (
    KmlElements,
    KmlObject,
    KmlStyleSelector,
    NodeTransformers
) {
    "use strict";

    /**
     * Constructs a Pair. Application usually don't call this constructor. It is called by {@link KmlFile} as
     * Objects from KmlFile are read. It is concrete implementation.
     * @alias Pair
     * @constructor
     * @classdesc Contains the data associated with Kml Pair
     * @param options {Object}
     * @param options.objectNode {Node} Node representing the Kml Pair.
     * @throws {ArgumentError} If either the node is null or undefined.
     * @see https://developers.google.com/kml/documentation/kmlreference#pair
     * @augments KmlObject
     */
    var Pair = function (options) {
        KmlObject.call(this, options);
    };

    Pair.prototype = Object.create(KmlObject.prototype);

    Object.defineProperties(Pair.prototype, {
        /**
         * Identifies the key
         * @memberof Pair.prototype
         * @readonly
         * @type {String}
         */
        kmlKey: {
            get: function() {
                return this._factory.specific(this, {name: 'key', transformer: NodeTransformers.string});
            }
        },

        /**
         * References the style using Url. If part of the same document start with the prefix #
         * @memberof Pair.prototype
         * @readonly
         * @type {String}
         */
        kmlStyleUrl: {
            get: function() {
                return this._factory.specific(this, {name: 'styleUrl', transformer: NodeTransformers.string});
            }
        },

        /**
         * Definition of styles applied to this Pair.
         * @memberof Pair.prototype
         * @readonly
         * @type {KmlStyle}
         */
        kmlStyleSelector: {
            get: function() {
                return this._factory.any(this, {
                    name: KmlStyleSelector.prototype.getTagNames()
                });
            }
        }
    });

    /**
     * @inheritDoc
     */
    Pair.prototype.getTagNames = function () {
        return ['Pair'];
    };

    /**
     * @inheritDoc
     */
    Pair.prototype.getStyle = function(styleResolver) {
        return styleResolver.handleRemoteStyle(this.kmlStyleUrl, this.kmlStyleSelector);
    };

    KmlElements.addKey(Pair.prototype.getTagNames()[0], Pair);

    return Pair;
});