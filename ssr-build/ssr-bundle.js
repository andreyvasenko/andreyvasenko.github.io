module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "1OQ/":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"projectWrapper":"projectWrapper__1Aak9","note":"note__1LWDP","projectPart":"projectPart__2OSe5","projectPart__details":"projectPart__details__2_Wk6","picContainer":"picContainer__2IO_p","pic":"pic__1IILi","codepenEmbedded":"codepenEmbedded__1NgaG"};

/***/ }),

/***/ "CjKo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"pageWrapper":"pageWrapper__1ie2g","errorType":"errorType__z3smI","errorType__content":"errorType__content__2aMu8"};

/***/ }),

/***/ "FJnM":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _preact = __webpack_require__("KM04");

var _preactSideEffect = __webpack_require__("xToX");

var _preactSideEffect2 = _interopRequireDefault(_preactSideEffect);

var _deepEqual = __webpack_require__("koiw");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _objectAssign = __webpack_require__("J4Nk");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("Qxat");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

var HELMET_ATTRIBUTE = "data-preact-helmet";

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props[property]) {
            return props[property];
        }
    }
    return null;
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, "title");
    var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, "defaultTitle");

    return innermostTitle || innermostDefaultTitle || "";
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, "onChangeClientState") || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        return typeof props[tagName] !== "undefined";
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var updateTitle = function updateTitle(title, attributes) {
    document.title = title || document.title;
    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var htmlTag = document.getElementsByTagName(tagName)[0];
    var helmetAttributeString = htmlTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";
        htmlTag.setAttribute(attribute, value);

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        htmlTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        htmlTag.removeAttribute(HELMET_ATTRIBUTE);
    } else {
        htmlTag.setAttribute(HELMET_ATTRIBUTE, helmetAttributes.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector("head");
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === "innerHTML") {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === "cssText") {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes) {
    var attributeString = generateHtmlAttributesAsString(attributes);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeString + ">" + encodeSpecialCharacters(title) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + ">" + encodeSpecialCharacters(title) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === "innerHTML" || attribute === "cssText");
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute]) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = [_HelmetConstants.TAG_NAMES.NOSCRIPT, _HelmetConstants.TAG_NAMES.SCRIPT, _HelmetConstants.TAG_NAMES.STYLE].indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeHtml + (isSelfClosing ? ">" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var generateTitleAsPreactComponent = function generateTitleAsPreactComponent(type, title, attributes) {
    // assigning into an array to define toString function on it
    var initProps = _defineProperty({
        key: title
    }, HELMET_ATTRIBUTE, true);
    var props = Object.keys(attributes).reduce(function (obj, key) {
        obj[key] = attributes[key];
        return obj;
    }, initProps);

    return [(0, _preact.h)(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsPreactComponent = function generateTagsAsPreactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var mappedTag = _defineProperty({
            key: i
        }, HELMET_ATTRIBUTE, true);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = attribute;

            if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return (0, _preact.h)(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsPreactComponent(type, tags.title, tags.titleAttributes);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes);
                }
            };
        case _HelmetConstants.TAG_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return tags;
                },
                toString: function toString() {
                    return generateHtmlAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsPreactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var htmlAttributes = _ref.htmlAttributes,
        title = _ref.title,
        titleAttributes = _ref.titleAttributes,
        baseTag = _ref.baseTag,
        metaTags = _ref.metaTags,
        linkTags = _ref.linkTags,
        scriptTags = _ref.scriptTags,
        noscriptTags = _ref.noscriptTags,
        styleTags = _ref.styleTags;
    return {
        htmlAttributes: getMethodsForTag(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }),
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };
};

/**
 * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
 * @param {String} title: "Title"
 * @param {String} defaultTitle: "Default Title"
 * @param {String} titleTemplate: "MySite.com - %s"
 * @param {Object} titleAttributes: {"itemprop": "name"}
 * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
 * @param {Array} meta: [{"name": "description", "content": "Test description"}]
 * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
 * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
 * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
 * @param {Array} style: [{"type": "text/css", "cssText": "div{ display: block; color: blue; }"}]
 * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
 */
var Helmet = function Helmet(WrappedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(HelmetWrapper, _Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, (HelmetWrapper.__proto__ || Object.getPrototypeOf(HelmetWrapper)).apply(this, arguments));
        }

        _createClass(HelmetWrapper, [{
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps) {
                var props = _extends({}, nextProps);
                if (!props.children || !props.children.length) {
                    delete props.children;
                }
                return !(0, _deepEqual2.default)(this.props, props);
            }
        }, {
            key: "render",
            value: function render() {
                return (0, _preact.h)(WrappedComponent, this.props);
            }
        }], [{
            key: "canUseDOM",

            // WrappedComponent.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.
            set: function set(canUseDOM) {
                WrappedComponent.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_preact.Component), _class.peek = WrappedComponent.peek, _class.rewind = function () {
        var mappedState = WrappedComponent.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                htmlAttributes: {},
                title: "",
                titleAttributes: {},
                baseTag: [],
                metaTags: [],
                linkTags: [],
                scriptTags: [],
                noscriptTags: [],
                styleTags: []
            });
        }

        return mappedState;
    }, _temp;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.TAG_NAMES.HTML, propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        onChangeClientState: getOnChangeClientState(propsList)
    };
};

var handleClientStateChange = function handleClientStateChange(newState) {
    var htmlAttributes = newState.htmlAttributes,
        title = newState.title,
        titleAttributes = newState.titleAttributes,
        baseTag = newState.baseTag,
        metaTags = newState.metaTags,
        linkTags = newState.linkTags,
        scriptTags = newState.scriptTags,
        noscriptTags = newState.noscriptTags,
        styleTags = newState.styleTags,
        onChangeClientState = newState.onChangeClientState;

    updateAttributes("html", htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;

        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    onChangeClientState(newState, addedTags, removedTags);
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _preactSideEffect2.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

exports.default = Helmet(HelmetSideEffects);
module.exports = exports["default"];

/***/ }),

/***/ "HoW2":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"card__1ssBE","pic":"pic__22Mpu"};

/***/ }),

/***/ "J4Nk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-helmet/lib/Helmet.js
var Helmet = __webpack_require__("FJnM");
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/card/style.css
var card_style = __webpack_require__("HoW2");
var card_style_default = /*#__PURE__*/__webpack_require__.n(card_style);

// CONCATENATED MODULE: ./components/card/index.js




var card_Card = function Card(_ref) {
	var cardTitle = _ref.cardTitle,
	    cardText = _ref.cardText,
	    cardImg = _ref.cardImg;
	return Object(preact_min["h"])(
		'div',
		{ 'class': card_style_default.a.card },
		Object(preact_min["h"])(
			'h1',
			null,
			cardTitle
		),
		Object(preact_min["h"])(
			'p',
			null,
			cardText
		),
		Object(preact_min["h"])('img', { 'class': card_style_default.a.pic, src: cardImg })
	);
};

/* harmony default export */ var card = (card_Card);
// CONCATENATED MODULE: ./routes/home/index.js







var home__ref = Object(preact_min["h"])(
	'h1',
	null,
	Object(preact_min["h"])(
		'span',
		null,
		'Hi!'
	),
	' My name is ',
	Object(preact_min["h"])('br', null),
	' Andrey\xA0Vasenko.'
);

var _ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'I am a UI/UX Designer ',
	Object(preact_min["h"])('br', null),
	' and Illustrator'
);

var _ref3 = Object(preact_min["h"])(
	match["Link"],
	{ href: '/instamotion/' },
	Object(preact_min["h"])(card, {
		cardTitle: 'InstaMotion',
		cardText: 'Designing and implementing different elements of e\u2011commerce website InstaMotion.com.',
		cardImg: 'assets/img/preview-instamotion.png' })
);

var _ref4 = Object(preact_min["h"])(
	match["Link"],
	{ href: '/codepen/' },
	Object(preact_min["h"])(card, {
		cardTitle: 'CodePen',
		cardText: 'Examples of my work in CodePen. Sometimes I use it to make a quick prototype or to show an Idea for a UI element.',
		cardImg: 'assets/img/preview-codepen.png' })
);

var _ref5 = Object(preact_min["h"])(
	match["Link"],
	{ href: '/redesign/' },
	Object(preact_min["h"])(card, {
		cardTitle: 'Redesign of InstaMotion.com',
		cardText: 'As a part of my bachelor\u2019s thesis, I worked on a redesign of InstaMotion.com. The work includes analysis of problems with usability and development of a new Look\xA0and\xA0Feel.',
		cardImg: 'assets/img/preview-ba.png' })
);

var home_Home = function Home() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': home_style_default.a.wrapper },
		Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.home },
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.home__content },
				home__ref,
				_ref2,
				Object(preact_min["h"])(
					'a',
					{ 'class': home_style_default.a.email, href: 'mailto:andreytme@gmail.com' },
					'andreytme@gmail.com'
				)
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.cards },
			Object(preact_min["h"])(
				'p',
				{ 'class': home_style_default.a.title },
				'Recent Work'
			),
			_ref3,
			_ref4,
			_ref5
		)
	);
};

/* harmony default export */ var home = (home_Home);
// EXTERNAL MODULE: ./routes/error/style.css
var error_style = __webpack_require__("CjKo");
var error_style_default = /*#__PURE__*/__webpack_require__.n(error_style);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js





var header__ref = Object(preact_min["h"])(
	match["Link"],
	{ href: '/' },
	'Andrey\xA0Vasenko'
);

var header__ref2 = Object(preact_min["h"])('i', { 'class': 'fas fa-envelope' });

var header__ref3 = Object(preact_min["h"])(
	'span',
	null,
	'andreytme@gmail.com'
);

var header_Header = function Header() {
	return Object(preact_min["h"])(
		'header',
		{ 'class': header_style_default.a.header },
		Object(preact_min["h"])(
			'div',
			{ 'class': header_style_default.a.header__content },
			header__ref,
			Object(preact_min["h"])(
				'a',
				{ 'class': header_style_default.a.email, href: 'mailto:andreytme@gmail.com' },
				header__ref2,
				header__ref3
			)
		)
	);
};

/* harmony default export */ var header = (header_Header);
// CONCATENATED MODULE: ./routes/error/index.js







var error__ref2 = Object(preact_min["h"])(header, null);

var error__ref3 = Object(preact_min["h"])(
	'p',
	null,
	'Page Not Found'
);

var error__ref4 = Object(preact_min["h"])(
	match["Link"],
	{ href: '/' },
	Object(preact_min["h"])('i', { 'class': 'fas fa-long-arrow-alt-left' }),
	Object(preact_min["h"])(
		'span',
		null,
		'go back'
	)
);

var error_ErrorType = function ErrorType(_ref) {
	var type = _ref.type;
	return Object(preact_min["h"])(
		'div',
		{ 'class': error_style_default.a.pageWrapper },
		error__ref2,
		Object(preact_min["h"])(
			'div',
			{ 'class': error_style_default.a.errorType },
			Object(preact_min["h"])(
				'div',
				{ 'class': error_style_default.a.errorType__content },
				Object(preact_min["h"])(
					'h1',
					null,
					'Error ',
					type
				),
				error__ref3,
				error__ref4
			)
		)
	);
};

/* harmony default export */ var error = (error_ErrorType);
// EXTERNAL MODULE: ./routes/instamotion/style.css
var instamotion_style = __webpack_require__("1OQ/");
var instamotion_style_default = /*#__PURE__*/__webpack_require__.n(instamotion_style);

// CONCATENATED MODULE: ./routes/instamotion/index.js








var instamotion__ref = Object(preact_min["h"])(header, null);

var instamotion__ref2 = Object(preact_min["h"])(
	'span',
	null,
	'Project'
);

var instamotion__ref3 = Object(preact_min["h"])('br', null);

var instamotion__ref4 = Object(preact_min["h"])(
	'span',
	null,
	'Role'
);

var instamotion__ref5 = Object(preact_min["h"])('br', null);

var _ref6 = Object(preact_min["h"])(
	'h1',
	null,
	'Career Page'
);

var _ref7 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-jobs-1.png" });

var _ref8 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-jobs-2.png" });

var _ref9 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-jobs-4.png" });

var _ref10 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-jobs-3.png" });

var _ref11 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-jobs-5.png" });

var _ref12 = Object(preact_min["h"])('img', { style: 'box-shadow:none;', src: "/assets/img/preview-instamotion.png" });

var _ref13 = Object(preact_min["h"])(
	'h1',
	null,
	'Page Loader'
);

var _ref14 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-loader-1.png" });

var _ref15 = Object(preact_min["h"])(
	'iframe',
	{ height: '432', style: 'width: 100%;', scrolling: 'no', title: 'loader08', src: '//codepen.io/andreyvasenko/embed/zJwwrZ/?height=265&theme-id=0&default-tab=result', frameborder: 'no', allowtransparency: 'true', allowfullscreen: 'true' },
	'See the Pen ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko/pen/zJwwrZ/' },
		'loader08'
	),
	' by Andrey Vasenko (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko' },
		'@andreyvasenko'
	),
	') on ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io' },
		'CodePen'
	),
	'.'
);

var _ref16 = Object(preact_min["h"])(
	'h1',
	null,
	'Process Steps'
);

var _ref17 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-info-1.png" });

var _ref18 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-info-2.png" });

var _ref19 = Object(preact_min["h"])('img', { src: "/assets/img/instamotion-info-3.png" });

var _ref20 = Object(preact_min["h"])(
	'iframe',
	{ height: '432', style: 'width: 100%;', scrolling: 'no', title: 'infogfx steps', src: '//codepen.io/andreyvasenko/embed/OaoJGL/?height=432&theme-id=0&default-tab=result', frameborder: 'no', allowtransparency: 'true', allowfullscreen: 'true' },
	'See the Pen ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko/pen/OaoJGL/' },
		'infogfx steps'
	),
	' by Andrey Vasenko (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko' },
		'@andreyvasenko'
	),
	') on ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io' },
		'CodePen'
	),
	'.'
);

var _ref21 = Object(preact_min["h"])(
	'div',
	{ 'class': 'buttons' },
	Object(preact_min["h"])(
		match["Link"],
		{ href: '/redesign/' },
		Object(preact_min["h"])('i', { 'class': 'fas fa-angle-left' }),
		'\xA0PREVIOUS PROJECT'
	),
	Object(preact_min["h"])(
		match["Link"],
		{ href: '/codepen/' },
		'NEXT PROJECT\xA0',
		Object(preact_min["h"])('i', { 'class': 'fas fa-angle-right' })
	)
);

var instamotion_InstaMotion = function InstaMotion() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': instamotion_style_default.a.projectWrapper },
		instamotion__ref,
		Object(preact_min["h"])(
			'p',
			{ 'class': instamotion_style_default.a.note },
			instamotion__ref2,
			' ',
			instamotion__ref3,
			'InstaMotion'
		),
		Object(preact_min["h"])(
			'p',
			{ 'class': instamotion_style_default.a.note },
			instamotion__ref4,
			' ',
			instamotion__ref5,
			'UI/UX Design, Illustration, HTML,\xA0CSS,\xA0JS'
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': instamotion_style_default.a.projectPart },
			_ref6,
			Object(preact_min["h"])(
				'p',
				{ 'class': instamotion_style_default.a.projectPart__details },
				'Due to the recent redesign of the website, many pages had to be adjusted to match the new visual style. For the career page, I started with going through the existing page, available user data, and best practices.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref7
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref8
				)
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': instamotion_style_default.a.projectPart },
			Object(preact_min["h"])(
				'p',
				{ 'class': instamotion_style_default.a.projectPart__details },
				'After that, I made some rough sketches and a quick first draft of the new design. During the first meeting with stakeholders, I collected feedback and discussed ideas. I continued to improve the design and made versions for different screen resolutions.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref9
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref10
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref11
				)
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': instamotion_style_default.a.projectPart },
			Object(preact_min["h"])(
				'p',
				{ 'class': instamotion_style_default.a.projectPart__details },
				'After several iterations of testing, collecting feedback and adjusting the design, I created a mockup using CSS and HTML.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref12
				)
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': instamotion_style_default.a.projectPart },
			_ref13,
			Object(preact_min["h"])(
				'p',
				{ 'class': instamotion_style_default.a.projectPart__details },
				'Depending on the user\'s internet connection speed it might take a while to load the SERP page. In which case it is necessary to visually communicate that the page is loading.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref14
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.codepenEmbedded },
				_ref15
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': instamotion_style_default.a.projectPart },
			_ref16,
			Object(preact_min["h"])(
				'p',
				{ 'class': instamotion_style_default.a.projectPart__details },
				'I designed and implemented a responsive step by step guide to explain to the user how the purchase process works.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref17
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref18
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': instamotion_style_default.a.pic },
					_ref19
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': instamotion_style_default.a.codepenEmbedded },
				_ref20
			)
		),
		_ref21
	);
};

/* harmony default export */ var instamotion = (instamotion_InstaMotion);
// EXTERNAL MODULE: ./routes/codepen/style.css
var codepen_style = __webpack_require__("aT7F");
var codepen_style_default = /*#__PURE__*/__webpack_require__.n(codepen_style);

// CONCATENATED MODULE: ./routes/codepen/index.js








var codepen__ref = Object(preact_min["h"])(header, null);

var codepen__ref2 = Object(preact_min["h"])(
	'span',
	null,
	'Project'
);

var codepen__ref3 = Object(preact_min["h"])('br', null);

var codepen__ref4 = Object(preact_min["h"])(
	'span',
	null,
	'Role'
);

var codepen__ref5 = Object(preact_min["h"])('br', null);

var codepen__ref6 = Object(preact_min["h"])(
	'h1',
	null,
	'CodePen'
);

var codepen__ref7 = Object(preact_min["h"])(
	'h2',
	null,
	'Flexbox Menu'
);

var codepen__ref8 = Object(preact_min["h"])(
	'iframe',
	{ height: '432', style: 'width: 100%;', scrolling: 'no', title: 'Menu (Flexbox)', src: '//codepen.io/andreyvasenko/embed/xjYqWP/?height=265&theme-id=0&default-tab=result', frameborder: 'no', allowtransparency: 'true', allowfullscreen: 'true' },
	'See the Pen ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko/pen/xjYqWP/' },
		'Menu (Flexbox)'
	),
	' by Andrey Vasenko (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko' },
		'@andreyvasenko'
	),
	') on ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io' },
		'CodePen'
	),
	'.'
);

var codepen__ref9 = Object(preact_min["h"])(
	'h2',
	null,
	'Music App Concept'
);

var codepen__ref10 = Object(preact_min["h"])('br', null);

var codepen__ref11 = Object(preact_min["h"])(
	'iframe',
	{ height: '768', style: 'width: 100%;', scrolling: 'no', title: 'Music WebApp Concept', src: '//codepen.io/andreyvasenko/embed/JzGLdN/?height=694&theme-id=0&default-tab=result', frameborder: 'no', allowtransparency: 'true', allowfullscreen: 'true' },
	'See the Pen ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko/pen/JzGLdN/' },
		'Music WebApp Concept'
	),
	' by Andrey Vasenko (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko' },
		'@andreyvasenko'
	),
	') on ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io' },
		'CodePen'
	),
	'.'
);

var codepen__ref12 = Object(preact_min["h"])(
	'h2',
	null,
	'Single Page App'
);

var codepen__ref13 = Object(preact_min["h"])(
	'iframe',
	{ height: '650', style: 'width: 100%;', scrolling: 'no', title: 'React Single Page', src: '//codepen.io/andreyvasenko/embed/jxWrqP/?height=655&theme-id=0&default-tab=result', frameborder: 'no', allowtransparency: 'true', allowfullscreen: 'true' },
	'See the Pen ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko/pen/jxWrqP/' },
		'React Single Page'
	),
	' by Andrey Vasenko (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko' },
		'@andreyvasenko'
	),
	') on ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io' },
		'CodePen'
	),
	'.'
);

var codepen__ref14 = Object(preact_min["h"])(
	'h2',
	null,
	'CSS-Doodle'
);

var codepen__ref15 = Object(preact_min["h"])(
	'a',
	{ href: 'https://codepen.io' },
	'very interesting web component'
);

var codepen__ref16 = Object(preact_min["h"])(
	'i',
	null,
	'Might not work on older browsers.'
);

var codepen__ref17 = Object(preact_min["h"])(
	'iframe',
	{ height: '294', style: 'width: 100%;', scrolling: 'no', title: 'css-doodle', src: '//codepen.io/andreyvasenko/embed/RyRKOe/?height=294&theme-id=0&default-tab=result', frameborder: 'no', allowtransparency: 'true', allowfullscreen: 'true' },
	'See the Pen ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko/pen/RyRKOe/' },
		'css-doodle'
	),
	' by Andrey Vasenko (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko' },
		'@andreyvasenko'
	),
	') on ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io' },
		'CodePen'
	),
	'.'
);

var codepen__ref18 = Object(preact_min["h"])(
	'h2',
	null,
	'Tilt Effect'
);

var codepen__ref19 = Object(preact_min["h"])(
	'i',
	null,
	'Might not work on older browsers.'
);

var codepen__ref20 = Object(preact_min["h"])(
	'iframe',
	{ height: '450', style: 'width: 100%;', scrolling: 'no', title: 'tilt 3d', src: '//codepen.io/andreyvasenko/embed/NMjMwM/?height=434&theme-id=0&default-tab=result', frameborder: 'no', allowtransparency: 'true', allowfullscreen: 'true' },
	'See the Pen ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko/pen/NMjMwM/' },
		'tilt 3d'
	),
	' by Andrey Vasenko (',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io/andreyvasenko' },
		'@andreyvasenko'
	),
	') on ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://codepen.io' },
		'CodePen'
	),
	'.'
);

var codepen__ref21 = Object(preact_min["h"])(
	'div',
	{ 'class': 'buttons' },
	Object(preact_min["h"])(
		match["Link"],
		{ href: '/instamotion/' },
		Object(preact_min["h"])('i', { 'class': 'fas fa-angle-left' }),
		'\xA0PREVIOUS PROJECT'
	),
	Object(preact_min["h"])(
		match["Link"],
		{ href: '/redesign/' },
		'NEXT PROJECT\xA0',
		Object(preact_min["h"])('i', { 'class': 'fas fa-angle-right' })
	)
);

var codepen_CodePen = function CodePen() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': codepen_style_default.a.projectWrapper },
		codepen__ref,
		Object(preact_min["h"])(
			'p',
			{ 'class': codepen_style_default.a.note },
			codepen__ref2,
			' ',
			codepen__ref3,
			'Personal'
		),
		Object(preact_min["h"])(
			'p',
			{ 'class': codepen_style_default.a.note },
			codepen__ref4,
			' ',
			codepen__ref5,
			'UI/UX Design, HTML,\xA0CSS,\xA0JS'
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': codepen_style_default.a.projectPart },
			codepen__ref6,
			codepen__ref7,
			Object(preact_min["h"])(
				'p',
				{ 'class': codepen_style_default.a.projectPart__details },
				'Collapsible menu concept.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': codepen_style_default.a.codepenEmbedded },
				codepen__ref8
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': codepen_style_default.a.projectPart },
			codepen__ref9,
			Object(preact_min["h"])(
				'p',
				{ 'class': codepen_style_default.a.projectPart__details },
				'A music app design I made to help me',
				codepen__ref10,
				' learn about the template engine Pug.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': codepen_style_default.a.codepenEmbedded },
				codepen__ref11
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': codepen_style_default.a.projectPart },
			codepen__ref12,
			Object(preact_min["h"])(
				'p',
				{ 'class': codepen_style_default.a.projectPart__details },
				'My first attempt to create a single page app with React.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': codepen_style_default.a.codepenEmbedded },
				codepen__ref13
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': codepen_style_default.a.projectPart },
			codepen__ref14,
			Object(preact_min["h"])(
				'p',
				{ 'class': codepen_style_default.a.projectPart__details },
				'A CSS pattern I made using ',
				codepen__ref15,
				'. ',
				codepen__ref16
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': codepen_style_default.a.codepenEmbedded },
				codepen__ref17
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': codepen_style_default.a.projectPart },
			codepen__ref18,
			Object(preact_min["h"])(
				'p',
				{ 'class': codepen_style_default.a.projectPart__details },
				'Animated tilt effect. ',
				codepen__ref19
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': codepen_style_default.a.codepenEmbedded },
				codepen__ref20
			)
		),
		codepen__ref21
	);
};

/* harmony default export */ var codepen = (codepen_CodePen);
// EXTERNAL MODULE: ./routes/redesignim/style.css
var redesignim_style = __webpack_require__("V2wk");
var redesignim_style_default = /*#__PURE__*/__webpack_require__.n(redesignim_style);

// CONCATENATED MODULE: ./routes/redesignim/index.js








var redesignim__ref = Object(preact_min["h"])(header, null);

var redesignim__ref2 = Object(preact_min["h"])(
	'span',
	null,
	'Project'
);

var redesignim__ref3 = Object(preact_min["h"])('br', null);

var redesignim__ref4 = Object(preact_min["h"])(
	'span',
	null,
	'Role'
);

var redesignim__ref5 = Object(preact_min["h"])('br', null);

var redesignim__ref6 = Object(preact_min["h"])(
	'h1',
	null,
	'Redesign of InstaMotion.com'
);

var redesignim__ref7 = Object(preact_min["h"])('img', { style: 'box-shadow: none;', src: "/assets/img/preview-ba.png" });

var redesignim__ref8 = Object(preact_min["h"])(
	'h2',
	null,
	'Homepage and Search'
);

var redesignim__ref9 = Object(preact_min["h"])('img', { src: "/assets/img/im-redesign-1.png" });

var redesignim__ref10 = Object(preact_min["h"])('img', { src: "/assets/img/im-redesign-2.png" });

var redesignim__ref11 = Object(preact_min["h"])(
	'h2',
	null,
	'SEO Content Design'
);

var redesignim__ref12 = Object(preact_min["h"])('img', { style: 'box-shadow: none;', src: "/assets/img/im-redesign-3.png" });

var redesignim__ref13 = Object(preact_min["h"])(
	'h2',
	null,
	'Animation and Interaction'
);

var redesignim__ref14 = Object(preact_min["h"])('img', { style: 'box-shadow: none;', src: "/assets/img/im-redesign-5.gif" });

var redesignim__ref15 = Object(preact_min["h"])('img', { style: 'box-shadow: none;', src: "/assets/img/im-redesign-6.gif" });

var redesignim__ref16 = Object(preact_min["h"])('img', { style: 'box-shadow: none;', src: "/assets/img/im-redesign-4.gif" });

var redesignim__ref17 = Object(preact_min["h"])(
	'div',
	{ 'class': 'buttons' },
	Object(preact_min["h"])(
		match["Link"],
		{ href: '/codepen/' },
		Object(preact_min["h"])('i', { 'class': 'fas fa-angle-left' }),
		'\xA0PREVIOUS PROJECT'
	),
	Object(preact_min["h"])(
		match["Link"],
		{ href: '/instamotion/' },
		'NEXT PROJECT\xA0',
		Object(preact_min["h"])('i', { 'class': 'fas fa-angle-right' })
	)
);

var redesignim_RedesignIM = function RedesignIM() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': redesignim_style_default.a.projectWrapper },
		redesignim__ref,
		Object(preact_min["h"])(
			'p',
			{ 'class': redesignim_style_default.a.note },
			redesignim__ref2,
			' ',
			redesignim__ref3,
			'InstaMotion, Bachelor\u2019s Thesis'
		),
		Object(preact_min["h"])(
			'p',
			{ 'class': redesignim_style_default.a.note },
			redesignim__ref4,
			' ',
			redesignim__ref5,
			'UI/UX Design, Illustration, HTML,\xA0CSS,\xA0JS'
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': redesignim_style_default.a.projectPart },
			redesignim__ref6,
			Object(preact_min["h"])(
				'p',
				{ 'class': redesignim_style_default.a.projectPart__details },
				'In this project, I worked with Hotjar and Google Analytics to collect and analyse user data. (Like user feedback, statistics, heatmaps, and recordings.) And with Sketch, Figma, CSS, HTML, JS to create designs and mockups.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': redesignim_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': redesignim_style_default.a.pic },
					redesignim__ref7
				)
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': redesignim_style_default.a.projectPart },
			redesignim__ref8,
			Object(preact_min["h"])(
				'p',
				{ 'class': redesignim_style_default.a.projectPart__details },
				'When researching user activity, I found out that using a text input field as the main search option was confusing for the user. Visitors would often copy the text from the placeholder, type in a car make or model and then spend more time readjusting the filters.'
			),
			Object(preact_min["h"])(
				'p',
				{ 'class': redesignim_style_default.a.projectPart__details },
				'I\'ve made it easier to access general categories and used free text search as an alternative to a more conventional variant.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': redesignim_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': redesignim_style_default.a.pic },
					redesignim__ref9
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': redesignim_style_default.a.pic },
					redesignim__ref10
				)
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': redesignim_style_default.a.projectPart },
			redesignim__ref11,
			Object(preact_min["h"])(
				'p',
				{ 'class': redesignim_style_default.a.projectPart__details },
				'According to Google Analytics, many of InstaMotion users are interested in reading car related articles. To make SEO texts more attractive for them, I used "magazine" and "newspaper" looks as inspiration.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': redesignim_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': redesignim_style_default.a.pic },
					redesignim__ref12
				)
			)
		),
		Object(preact_min["h"])(
			'div',
			{ 'class': redesignim_style_default.a.projectPart },
			redesignim__ref13,
			Object(preact_min["h"])(
				'p',
				{ 'class': redesignim_style_default.a.projectPart__details },
				'I used a combination of overall minimalistic design and interesting interactive elements to make the website more responsive to the user\'s actions and be easy to navigate.'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': redesignim_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': redesignim_style_default.a.pic },
					redesignim__ref14
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': redesignim_style_default.a.pic },
					redesignim__ref15
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': redesignim_style_default.a.picContainer },
				Object(preact_min["h"])(
					'div',
					{ 'class': redesignim_style_default.a.pic },
					redesignim__ref16
				)
			)
		),
		redesignim__ref17
	);
};

/* harmony default export */ var redesignim = (redesignim_RedesignIM);
// CONCATENATED MODULE: ./components/app.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





// Code-splitting is automated for routes






var app__ref = Object(preact_min["h"])(home, { path: '/' });

var app__ref2 = Object(preact_min["h"])(instamotion, { path: '/instamotion' });

var app__ref3 = Object(preact_min["h"])(codepen, { path: '/codepen' });

var app__ref4 = Object(preact_min["h"])(redesignim, { path: '/redesign' });

var app__ref5 = Object(preact_min["h"])(error, { type: '404', 'default': true });

var app_App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
			scrollToTop();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(Helmet_default.a, {
				title: 'Andrey Vasenko',
				link: [{ "rel": "stylesheet", "href": "https://use.fontawesome.com/releases/v5.7.2/css/all.css", "integrity": "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr", "crossorigin": "anonymous" }]
			}),
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				app__ref,
				app__ref2,
				app__ref3,
				app__ref4,
				app__ref5
			)
		);
	};

	return App;
}(preact_min["Component"]);




function scrollToTop() {
	if (typeof window !== "undefined") {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
}
// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "OWwF":
/***/ (function(module, exports) {

var supportsArgumentsClass = function () {
  return Object.prototype.toString.call(arguments);
}() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object) {
  return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
};

/***/ }),

/***/ "Qxat":
/***/ (function(module, exports) {

exports.__esModule = true;
var TAG_NAMES = exports.TAG_NAMES = {
    HTML: "htmlAttributes",
    TITLE: "title",
    BASE: "base",
    META: "meta",
    LINK: "link",
    SCRIPT: "script",
    NOSCRIPT: "noscript",
    STYLE: "style"
};

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    NAME: "name",
    CHARSET: "charset",
    HTTPEQUIV: "http-equiv",
    REL: "rel",
    HREF: "href",
    PROPERTY: "property",
    SRC: "src",
    INNER_HTML: "innerHTML",
    CSS_TEXT: "cssText",
    ITEM_PROP: "itemprop"
};

var PREACT_TAG_MAP = exports.PREACT_TAG_MAP = {
    "charset": "charSet",
    "http-equiv": "httpEquiv",
    "itemprop": "itemProp",
    "class": "className"
};

/***/ }),

/***/ "V2wk":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"projectWrapper":"projectWrapper__3w87-","note":"note__1g0Iv","projectPart":"projectPart__2n7Vw","projectPart__details":"projectPart__details__2754g","picContainer":"picContainer__LUw-l","pic":"pic__1P0c0","codepenEmbedded":"codepenEmbedded___Q7k3"};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"wrapper":"wrapper__aVDuI","cards":"cards__1wK7-","title":"title__1cB4T","home":"home__2Q5nZ","home__content":"home__content__3rRpp","email":"email__3sU1u"};

/***/ }),

/***/ "aT7F":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"projectWrapper":"projectWrapper__3H4Zc","note":"note__1IpL_","projectPart":"projectPart__2aIHK","projectPart__details":"projectPart__details__3ft-B","picContainer":"picContainer__25cNO","pic":"pic__2Vq5S","codepenEmbedded":"codepenEmbedded__20q6s"};

/***/ }),

/***/ "koiw":
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__("mbYX");
var isArguments = __webpack_require__("OWwF");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

/***/ }),

/***/ "mbYX":
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

exports.shim = shim;
function shim(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
}

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","header__content":"header__content__2BBnj","email":"email__1o8Or"};

/***/ }),

/***/ "xToX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__("KM04");

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /** @jsx h */

module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        // preact-compat normally does this
        var children = nextProps.children,
            props = _objectWithoutProperties(nextProps, ['children']);

        if (children && children.length) props.children = children;
        return shallowDiffers(props, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return (0, _preact.h)(WrappedComponent, this.props);
      };

      return SideEffect;
    }(_preact.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

    return SideEffect;
  };

  // Pulled from react-compat
  function shallowDiffers(a, b) {
    for (var i in a) {
      if (!(i in b)) return true;
    }for (var _i in b) {
      if (a[_i] !== b[_i]) return true;
    }return false;
  }
};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map