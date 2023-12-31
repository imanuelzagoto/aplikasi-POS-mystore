/*! For license information please see filepond.js.LICENSE.txt */
(() => {
    var e = {
            8236: function (e) {
                e.exports = (function () {
                    "use strict";
                    var e = function (e) {
                        var t = e.addFilter,
                            n = e.utils,
                            r = n.Type,
                            i = n.replaceInString,
                            o = n.toNaturalFileSize;
                        return (
                            t("ALLOW_HOPPER_ITEM", function (e, t) {
                                var n = t.query;
                                if (!n("GET_ALLOW_FILE_SIZE_VALIDATION"))
                                    return !0;
                                var r = n("GET_MAX_FILE_SIZE");
                                if (null !== r && e.size >= r) return !1;
                                var i = n("GET_MIN_FILE_SIZE");
                                return !(null !== i && e.size <= i);
                            }),
                            t("LOAD_FILE", function (e, t) {
                                var n = t.query;
                                return new Promise(function (t, r) {
                                    if (!n("GET_ALLOW_FILE_SIZE_VALIDATION"))
                                        return t(e);
                                    var a = n("GET_FILE_VALIDATE_SIZE_FILTER");
                                    if (a && !a(e)) return t(e);
                                    var s = n("GET_MAX_FILE_SIZE");
                                    if (null !== s && e.size >= s)
                                        r({
                                            status: {
                                                main: n(
                                                    "GET_LABEL_MAX_FILE_SIZE_EXCEEDED"
                                                ),
                                                sub: i(
                                                    n(
                                                        "GET_LABEL_MAX_FILE_SIZE"
                                                    ),
                                                    {
                                                        filesize: o(
                                                            s,
                                                            ".",
                                                            n(
                                                                "GET_FILE_SIZE_BASE"
                                                            ),
                                                            n(
                                                                "GET_FILE_SIZE_LABELS",
                                                                n
                                                            )
                                                        ),
                                                    }
                                                ),
                                            },
                                        });
                                    else {
                                        var u = n("GET_MIN_FILE_SIZE");
                                        if (null !== u && e.size <= u)
                                            r({
                                                status: {
                                                    main: n(
                                                        "GET_LABEL_MIN_FILE_SIZE_EXCEEDED"
                                                    ),
                                                    sub: i(
                                                        n(
                                                            "GET_LABEL_MIN_FILE_SIZE"
                                                        ),
                                                        {
                                                            filesize: o(
                                                                u,
                                                                ".",
                                                                n(
                                                                    "GET_FILE_SIZE_BASE"
                                                                ),
                                                                n(
                                                                    "GET_FILE_SIZE_LABELS",
                                                                    n
                                                                )
                                                            ),
                                                        }
                                                    ),
                                                },
                                            });
                                        else {
                                            var l = n(
                                                "GET_MAX_TOTAL_FILE_SIZE"
                                            );
                                            if (
                                                null !== l &&
                                                n("GET_ACTIVE_ITEMS").reduce(
                                                    function (e, t) {
                                                        return e + t.fileSize;
                                                    },
                                                    0
                                                ) > l
                                            )
                                                return void r({
                                                    status: {
                                                        main: n(
                                                            "GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"
                                                        ),
                                                        sub: i(
                                                            n(
                                                                "GET_LABEL_MAX_TOTAL_FILE_SIZE"
                                                            ),
                                                            {
                                                                filesize: o(
                                                                    l,
                                                                    ".",
                                                                    n(
                                                                        "GET_FILE_SIZE_BASE"
                                                                    ),
                                                                    n(
                                                                        "GET_FILE_SIZE_LABELS",
                                                                        n
                                                                    )
                                                                ),
                                                            }
                                                        ),
                                                    },
                                                });
                                            t(e);
                                        }
                                    }
                                });
                            }),
                            {
                                options: {
                                    allowFileSizeValidation: [!0, r.BOOLEAN],
                                    maxFileSize: [null, r.INT],
                                    minFileSize: [null, r.INT],
                                    maxTotalFileSize: [null, r.INT],
                                    fileValidateSizeFilter: [null, r.FUNCTION],
                                    labelMinFileSizeExceeded: [
                                        "File is too small",
                                        r.STRING,
                                    ],
                                    labelMinFileSize: [
                                        "Minimum file size is {filesize}",
                                        r.STRING,
                                    ],
                                    labelMaxFileSizeExceeded: [
                                        "File is too large",
                                        r.STRING,
                                    ],
                                    labelMaxFileSize: [
                                        "Maximum file size is {filesize}",
                                        r.STRING,
                                    ],
                                    labelMaxTotalFileSizeExceeded: [
                                        "Maximum total size exceeded",
                                        r.STRING,
                                    ],
                                    labelMaxTotalFileSize: [
                                        "Maximum total file size is {filesize}",
                                        r.STRING,
                                    ],
                                },
                            }
                        );
                    };
                    return (
                        "undefined" != typeof window &&
                            void 0 !== window.document &&
                            document.dispatchEvent(
                                new CustomEvent("FilePond:pluginloaded", {
                                    detail: e,
                                })
                            ),
                        e
                    );
                })();
            },
            521: function (e) {
                e.exports = (function () {
                    "use strict";
                    var e = function (e) {
                        var t = e.addFilter,
                            n = e.utils,
                            r = n.Type,
                            i = n.isString,
                            o = n.replaceInString,
                            a = n.guesstimateMimeType,
                            s = n.getExtensionFromFilename,
                            u = n.getFilenameFromURL,
                            l = function (e, t) {
                                return (
                                    (/^[^/]+/.exec(e) || []).pop() ===
                                    t.slice(0, -2)
                                );
                            },
                            c = function (e, t) {
                                return e.some(function (e) {
                                    return /\*$/.test(e) ? l(t, e) : e === t;
                                });
                            },
                            f = function (e) {
                                var t = "";
                                if (i(e)) {
                                    var n = u(e),
                                        r = s(n);
                                    r && (t = a(r));
                                } else t = e.type;
                                return t;
                            },
                            d = function (e, t, n) {
                                if (0 === t.length) return !0;
                                var r = f(e);
                                return n
                                    ? new Promise(function (i, o) {
                                          n(e, r)
                                              .then(function (e) {
                                                  c(t, e) ? i() : o();
                                              })
                                              .catch(o);
                                      })
                                    : c(t, r);
                            },
                            p = function (e) {
                                return function (t) {
                                    return null !== e[t] && (e[t] || t);
                                };
                            };
                        return (
                            t("SET_ATTRIBUTE_TO_OPTION_MAP", function (e) {
                                return Object.assign(e, {
                                    accept: "acceptedFileTypes",
                                });
                            }),
                            t("ALLOW_HOPPER_ITEM", function (e, t) {
                                var n = t.query;
                                return (
                                    !n("GET_ALLOW_FILE_TYPE_VALIDATION") ||
                                    d(e, n("GET_ACCEPTED_FILE_TYPES"))
                                );
                            }),
                            t("LOAD_FILE", function (e, t) {
                                var n = t.query;
                                return new Promise(function (t, r) {
                                    if (n("GET_ALLOW_FILE_TYPE_VALIDATION")) {
                                        var i = n("GET_ACCEPTED_FILE_TYPES"),
                                            a = n(
                                                "GET_FILE_VALIDATE_TYPE_DETECT_TYPE"
                                            ),
                                            s = d(e, i, a),
                                            u = function () {
                                                var e = i
                                                    .map(
                                                        p(
                                                            n(
                                                                "GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"
                                                            )
                                                        )
                                                    )
                                                    .filter(function (e) {
                                                        return !1 !== e;
                                                    });
                                                r({
                                                    status: {
                                                        main: n(
                                                            "GET_LABEL_FILE_TYPE_NOT_ALLOWED"
                                                        ),
                                                        sub: o(
                                                            n(
                                                                "GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"
                                                            ),
                                                            {
                                                                allTypes:
                                                                    e.join(
                                                                        ", "
                                                                    ),
                                                                allButLastType:
                                                                    e
                                                                        .slice(
                                                                            0,
                                                                            -1
                                                                        )
                                                                        .join(
                                                                            ", "
                                                                        ),
                                                                lastType:
                                                                    e[
                                                                        e.length -
                                                                            1
                                                                    ],
                                                            }
                                                        ),
                                                    },
                                                });
                                            };
                                        if ("boolean" == typeof s)
                                            return s ? t(e) : u();
                                        s.then(function () {
                                            t(e);
                                        }).catch(u);
                                    } else t(e);
                                });
                            }),
                            {
                                options: {
                                    allowFileTypeValidation: [!0, r.BOOLEAN],
                                    acceptedFileTypes: [[], r.ARRAY],
                                    labelFileTypeNotAllowed: [
                                        "File is of invalid type",
                                        r.STRING,
                                    ],
                                    fileValidateTypeLabelExpectedTypes: [
                                        "Expects {allButLastType} or {lastType}",
                                        r.STRING,
                                    ],
                                    fileValidateTypeLabelExpectedTypesMap: [
                                        {},
                                        r.OBJECT,
                                    ],
                                    fileValidateTypeDetectType: [
                                        null,
                                        r.FUNCTION,
                                    ],
                                },
                            }
                        );
                    };
                    return (
                        "undefined" != typeof window &&
                            void 0 !== window.document &&
                            document.dispatchEvent(
                                new CustomEvent("FilePond:pluginloaded", {
                                    detail: e,
                                })
                            ),
                        e
                    );
                })();
            },
            5180: function (e) {
                e.exports = (function () {
                    "use strict";
                    var e = function (e) {
                            return /^image/.test(e.type);
                        },
                        t = function (t) {
                            var n = t.addFilter,
                                r = t.utils,
                                i = r.Type,
                                o = r.isFile,
                                a = r.getNumericAspectRatioFromString,
                                s = function (t, n) {
                                    return !(
                                        !e(t.file) || !n("GET_ALLOW_IMAGE_CROP")
                                    );
                                },
                                u = function (e) {
                                    return "object" == typeof e;
                                },
                                l = function (e) {
                                    return "number" == typeof e;
                                },
                                c = function (e, t) {
                                    return e.setMetadata(
                                        "crop",
                                        Object.assign(
                                            {},
                                            e.getMetadata("crop"),
                                            t
                                        )
                                    );
                                };
                            return (
                                n("DID_CREATE_ITEM", function (e, t) {
                                    var n = t.query;
                                    e.extend("setImageCrop", function (t) {
                                        if (s(e, n) && u(center))
                                            return e.setMetadata("crop", t), t;
                                    }),
                                        e.extend(
                                            "setImageCropCenter",
                                            function (t) {
                                                if (s(e, n) && u(t))
                                                    return c(e, { center: t });
                                            }
                                        ),
                                        e.extend(
                                            "setImageCropZoom",
                                            function (t) {
                                                if (s(e, n) && l(t))
                                                    return c(e, {
                                                        zoom: Math.max(1, t),
                                                    });
                                            }
                                        ),
                                        e.extend(
                                            "setImageCropRotation",
                                            function (t) {
                                                if (s(e, n) && l(t))
                                                    return c(e, {
                                                        rotation: t,
                                                    });
                                            }
                                        ),
                                        e.extend(
                                            "setImageCropFlip",
                                            function (t) {
                                                if (s(e, n) && u(t))
                                                    return c(e, { flip: t });
                                            }
                                        ),
                                        e.extend(
                                            "setImageCropAspectRatio",
                                            function (t) {
                                                if (s(e, n) && void 0 !== t) {
                                                    var r =
                                                            e.getMetadata(
                                                                "crop"
                                                            ),
                                                        i = a(t),
                                                        o = {
                                                            center: {
                                                                x: 0.5,
                                                                y: 0.5,
                                                            },
                                                            flip: r
                                                                ? Object.assign(
                                                                      {},
                                                                      r.flip
                                                                  )
                                                                : {
                                                                      horizontal:
                                                                          !1,
                                                                      vertical:
                                                                          !1,
                                                                  },
                                                            rotation: 0,
                                                            zoom: 1,
                                                            aspectRatio: i,
                                                        };
                                                    return (
                                                        e.setMetadata(
                                                            "crop",
                                                            o
                                                        ),
                                                        o
                                                    );
                                                }
                                            }
                                        );
                                }),
                                n("DID_LOAD_ITEM", function (t, n) {
                                    var r = n.query;
                                    return new Promise(function (n, i) {
                                        var s = t.file;
                                        if (
                                            !o(s) ||
                                            !e(s) ||
                                            !r("GET_ALLOW_IMAGE_CROP")
                                        )
                                            return n(t);
                                        if (t.getMetadata("crop")) return n(t);
                                        var u = r(
                                            "GET_IMAGE_CROP_ASPECT_RATIO"
                                        );
                                        t.setMetadata("crop", {
                                            center: { x: 0.5, y: 0.5 },
                                            flip: {
                                                horizontal: !1,
                                                vertical: !1,
                                            },
                                            rotation: 0,
                                            zoom: 1,
                                            aspectRatio: u ? a(u) : null,
                                        }),
                                            n(t);
                                    });
                                }),
                                {
                                    options: {
                                        allowImageCrop: [!0, i.BOOLEAN],
                                        imageCropAspectRatio: [null, i.STRING],
                                    },
                                }
                            );
                        };
                    return (
                        "undefined" != typeof window &&
                            void 0 !== window.document &&
                            document.dispatchEvent(
                                new CustomEvent("FilePond:pluginloaded", {
                                    detail: t,
                                })
                            ),
                        t
                    );
                })();
            },
            5227: function (e) {
                e.exports = (function () {
                    "use strict";
                    var e = function (e) {
                            return /^image\/jpeg/.test(e.type);
                        },
                        t = {
                            JPEG: 65496,
                            APP1: 65505,
                            EXIF: 1165519206,
                            TIFF: 18761,
                            Orientation: 274,
                            Unknown: 65280,
                        },
                        n = function (e, t) {
                            var n =
                                arguments.length > 2 &&
                                void 0 !== arguments[2] &&
                                arguments[2];
                            return e.getUint16(t, n);
                        },
                        r = function (e, t) {
                            var n =
                                arguments.length > 2 &&
                                void 0 !== arguments[2] &&
                                arguments[2];
                            return e.getUint32(t, n);
                        },
                        i = function (e) {
                            return new Promise(function (i, o) {
                                var a = new FileReader();
                                (a.onload = function (e) {
                                    var o = new DataView(e.target.result);
                                    if (n(o, 0) === t.JPEG) {
                                        for (
                                            var a = o.byteLength, s = 2;
                                            s < a;

                                        ) {
                                            var u = n(o, s);
                                            if (((s += 2), u === t.APP1)) {
                                                if (r(o, (s += 2)) !== t.EXIF)
                                                    break;
                                                var l =
                                                    n(o, (s += 6)) === t.TIFF;
                                                s += r(o, s + 4, l);
                                                var c = n(o, s, l);
                                                s += 2;
                                                for (var f = 0; f < c; f++)
                                                    if (
                                                        n(o, s + 12 * f, l) ===
                                                        t.Orientation
                                                    )
                                                        return void i(
                                                            n(
                                                                o,
                                                                s + 12 * f + 8,
                                                                l
                                                            )
                                                        );
                                            } else {
                                                if (
                                                    (u & t.Unknown) !==
                                                    t.Unknown
                                                )
                                                    break;
                                                s += n(o, s);
                                            }
                                        }
                                        i(-1);
                                    } else i(-1);
                                }),
                                    a.readAsArrayBuffer(e.slice(0, 65536));
                            });
                        },
                        o =
                            "undefined" != typeof window &&
                            void 0 !== window.document,
                        a =
                            "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=",
                        s = void 0,
                        u = o ? new Image() : {};
                    (u.onload = function () {
                        return (s = u.naturalWidth > u.naturalHeight);
                    }),
                        (u.src = a);
                    var l = function () {
                            return s;
                        },
                        c = function (t) {
                            var n = t.addFilter,
                                r = t.utils,
                                o = r.Type,
                                a = r.isFile;
                            return (
                                n("DID_LOAD_ITEM", function (t, n) {
                                    var r = n.query;
                                    return new Promise(function (n, o) {
                                        var s = t.file;
                                        if (
                                            !(
                                                a(s) &&
                                                e(s) &&
                                                r(
                                                    "GET_ALLOW_IMAGE_EXIF_ORIENTATION"
                                                ) &&
                                                l()
                                            )
                                        )
                                            return n(t);
                                        i(s).then(function (e) {
                                            t.setMetadata("exif", {
                                                orientation: e,
                                            }),
                                                n(t);
                                        });
                                    });
                                }),
                                {
                                    options: {
                                        allowImageExifOrientation: [
                                            !0,
                                            o.BOOLEAN,
                                        ],
                                    },
                                }
                            );
                        };
                    return (
                        "undefined" != typeof window &&
                            void 0 !== window.document &&
                            document.dispatchEvent(
                                new CustomEvent("FilePond:pluginloaded", {
                                    detail: c,
                                })
                            ),
                        c
                    );
                })();
            },
            1571: function (e) {
                e.exports = (function () {
                    "use strict";
                    var e = function (e) {
                            return /^image/.test(e.type);
                        },
                        t = function (t) {
                            var n = t.addFilter,
                                r = t.utils.Type;
                            return (
                                n("DID_LOAD_ITEM", function (t, n) {
                                    var r = n.query;
                                    return new Promise(function (n, i) {
                                        var o = t.file;
                                        if (
                                            !e(o) ||
                                            !r("GET_ALLOW_IMAGE_FILTER")
                                        )
                                            return n(t);
                                        var a = r(
                                            "GET_IMAGE_FILTER_COLOR_MATRIX"
                                        );
                                        if (!a || 20 !== a.length) return n(t);
                                        t.setMetadata("filter", a), n(t);
                                    });
                                }),
                                {
                                    options: {
                                        allowImageFilter: [!0, r.BOOLEAN],
                                        imageFilterColorMatrix: [null, r.ARRAY],
                                    },
                                }
                            );
                        };
                    return (
                        "undefined" != typeof window &&
                            void 0 !== window.document &&
                            document.dispatchEvent(
                                new CustomEvent("FilePond:pluginloaded", {
                                    detail: t,
                                })
                            ),
                        t
                    );
                })();
            },
            2965: function (e) {
                e.exports = (function () {
                    "use strict";
                    var e = function (e) {
                        return /^image/.test(e.type);
                    };
                    function t(e) {
                        this.wrapped = e;
                    }
                    function n(e) {
                        var n, r;
                        function i(e, t) {
                            return new Promise(function (i, a) {
                                var s = {
                                    key: e,
                                    arg: t,
                                    resolve: i,
                                    reject: a,
                                    next: null,
                                };
                                r ? (r = r.next = s) : ((n = r = s), o(e, t));
                            });
                        }
                        function o(n, r) {
                            try {
                                var i = e[n](r),
                                    s = i.value,
                                    u = s instanceof t;
                                Promise.resolve(u ? s.wrapped : s).then(
                                    function (e) {
                                        u
                                            ? o("next", e)
                                            : a(
                                                  i.done ? "return" : "normal",
                                                  e
                                              );
                                    },
                                    function (e) {
                                        o("throw", e);
                                    }
                                );
                            } catch (e) {
                                a("throw", e);
                            }
                        }
                        function a(e, t) {
                            switch (e) {
                                case "return":
                                    n.resolve({ value: t, done: !0 });
                                    break;
                                case "throw":
                                    n.reject(t);
                                    break;
                                default:
                                    n.resolve({ value: t, done: !1 });
                            }
                            (n = n.next) ? o(n.key, n.arg) : (r = null);
                        }
                        (this._invoke = i),
                            "function" != typeof e.return &&
                                (this.return = void 0);
                    }
                    function r(e, t) {
                        return i(e) || o(e, t) || a();
                    }
                    function i(e) {
                        if (Array.isArray(e)) return e;
                    }
                    function o(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            o = void 0;
                        try {
                            for (
                                var a, s = e[Symbol.iterator]();
                                !(r = (a = s.next()).done) &&
                                (n.push(a.value), !t || n.length !== t);
                                r = !0
                            );
                        } catch (e) {
                            (i = !0), (o = e);
                        } finally {
                            try {
                                r || null == s.return || s.return();
                            } finally {
                                if (i) throw o;
                            }
                        }
                        return n;
                    }
                    function a() {
                        throw new TypeError(
                            "Invalid attempt to destructure non-iterable instance"
                        );
                    }
                    "function" == typeof Symbol &&
                        Symbol.asyncIterator &&
                        (n.prototype[Symbol.asyncIterator] = function () {
                            return this;
                        }),
                        (n.prototype.next = function (e) {
                            return this._invoke("next", e);
                        }),
                        (n.prototype.throw = function (e) {
                            return this._invoke("throw", e);
                        }),
                        (n.prototype.return = function (e) {
                            return this._invoke("return", e);
                        });
                    var s = function (e, t) {
                            return f(e.x * t, e.y * t);
                        },
                        u = function (e, t) {
                            return f(e.x + t.x, e.y + t.y);
                        },
                        l = function (e) {
                            var t = Math.sqrt(e.x * e.x + e.y * e.y);
                            return 0 === t
                                ? { x: 0, y: 0 }
                                : f(e.x / t, e.y / t);
                        },
                        c = function (e, t, n) {
                            var r = Math.cos(t),
                                i = Math.sin(t),
                                o = f(e.x - n.x, e.y - n.y);
                            return f(
                                n.x + r * o.x - i * o.y,
                                n.y + i * o.x + r * o.y
                            );
                        },
                        f = function () {
                            return {
                                x:
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : 0,
                                y:
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 0,
                            };
                        },
                        d = function (e, t) {
                            var n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 1,
                                r =
                                    arguments.length > 3
                                        ? arguments[3]
                                        : void 0;
                            return "string" == typeof e
                                ? parseFloat(e) * n
                                : "number" == typeof e
                                ? e * (r ? t[r] : Math.min(t.width, t.height))
                                : void 0;
                        },
                        p = function (e, t, n) {
                            var r = e.borderStyle || e.lineStyle || "solid",
                                i =
                                    e.backgroundColor ||
                                    e.fontColor ||
                                    "transparent",
                                o =
                                    e.borderColor ||
                                    e.lineColor ||
                                    "transparent",
                                a = d(e.borderWidth || e.lineWidth, t, n);
                            return {
                                "stroke-linecap": e.lineCap || "round",
                                "stroke-linejoin": e.lineJoin || "round",
                                "stroke-width": a || 0,
                                "stroke-dasharray":
                                    "string" == typeof r
                                        ? ""
                                        : r
                                              .map(function (e) {
                                                  return d(e, t, n);
                                              })
                                              .join(","),
                                stroke: o,
                                fill: i,
                                opacity: e.opacity || 1,
                            };
                        },
                        E = function (e) {
                            return null != e;
                        },
                        h = function (e, t) {
                            var n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 1,
                                r =
                                    d(e.x, t, n, "width") ||
                                    d(e.left, t, n, "width"),
                                i =
                                    d(e.y, t, n, "height") ||
                                    d(e.top, t, n, "height"),
                                o = d(e.width, t, n, "width"),
                                a = d(e.height, t, n, "height"),
                                s = d(e.right, t, n, "width"),
                                u = d(e.bottom, t, n, "height");
                            return (
                                E(i) ||
                                    (i = E(a) && E(u) ? t.height - a - u : u),
                                E(r) ||
                                    (r = E(o) && E(s) ? t.width - o - s : s),
                                E(o) ||
                                    (o = E(r) && E(s) ? t.width - r - s : 0),
                                E(a) ||
                                    (a = E(i) && E(u) ? t.height - i - u : 0),
                                {
                                    x: r || 0,
                                    y: i || 0,
                                    width: o || 0,
                                    height: a || 0,
                                }
                            );
                        },
                        _ = function (e) {
                            return e
                                .map(function (e, t) {
                                    return ""
                                        .concat(0 === t ? "M" : "L", " ")
                                        .concat(e.x, " ")
                                        .concat(e.y);
                                })
                                .join(" ");
                        },
                        m = function (e, t) {
                            return Object.keys(t).forEach(function (n) {
                                return e.setAttribute(n, t[n]);
                            });
                        },
                        g = "http://www.w3.org/2000/svg",
                        I = function (e, t) {
                            var n = document.createElementNS(g, e);
                            return t && m(n, t), n;
                        },
                        T = function (e) {
                            return m(e, Object.assign({}, e.rect, e.styles));
                        },
                        v = function (e) {
                            var t = e.rect.x + 0.5 * e.rect.width,
                                n = e.rect.y + 0.5 * e.rect.height,
                                r = 0.5 * e.rect.width,
                                i = 0.5 * e.rect.height;
                            return m(
                                e,
                                Object.assign(
                                    { cx: t, cy: n, rx: r, ry: i },
                                    e.styles
                                )
                            );
                        },
                        y = {
                            contain: "xMidYMid meet",
                            cover: "xMidYMid slice",
                        },
                        R = function (e, t) {
                            m(
                                e,
                                Object.assign({}, e.rect, e.styles, {
                                    preserveAspectRatio: y[t.fit] || "none",
                                })
                            );
                        },
                        O = { left: "start", center: "middle", right: "end" },
                        A = function (e, t, n, r) {
                            var i = d(t.fontSize, n, r),
                                o = t.fontFamily || "Nunito",
                                a = t.fontWeight || "normal",
                                s = O[t.textAlign] || "start";
                            m(
                                e,
                                Object.assign({}, e.rect, e.styles, {
                                    "stroke-width": 0,
                                    "font-weight": a,
                                    "font-size": i,
                                    "font-family": o,
                                    "text-anchor": s,
                                })
                            ),
                                e.text !== t.text &&
                                    ((e.text = t.text),
                                    (e.textContent = t.text.length
                                        ? t.text
                                        : " "));
                        },
                        D = function (e, t, n, r) {
                            m(
                                e,
                                Object.assign({}, e.rect, e.styles, {
                                    fill: "none",
                                })
                            );
                            var i = e.childNodes[0],
                                o = e.childNodes[1],
                                a = e.childNodes[2],
                                f = e.rect,
                                p = {
                                    x: e.rect.x + e.rect.width,
                                    y: e.rect.y + e.rect.height,
                                };
                            if (
                                (m(i, { x1: f.x, y1: f.y, x2: p.x, y2: p.y }),
                                t.lineDecoration)
                            ) {
                                (o.style.display = "none"),
                                    (a.style.display = "none");
                                var E = l({ x: p.x - f.x, y: p.y - f.y }),
                                    h = d(0.05, n, r);
                                if (
                                    -1 !==
                                    t.lineDecoration.indexOf("arrow-begin")
                                ) {
                                    var _ = s(E, h),
                                        g = u(f, _),
                                        I = c(f, 2, g),
                                        T = c(f, -2, g);
                                    m(o, {
                                        style: "display:block;",
                                        d: "M"
                                            .concat(I.x, ",")
                                            .concat(I.y, " L")
                                            .concat(f.x, ",")
                                            .concat(f.y, " L")
                                            .concat(T.x, ",")
                                            .concat(T.y),
                                    });
                                }
                                if (
                                    -1 !== t.lineDecoration.indexOf("arrow-end")
                                ) {
                                    var v = s(E, -h),
                                        y = u(p, v),
                                        R = c(p, 2, y),
                                        O = c(p, -2, y);
                                    m(a, {
                                        style: "display:block;",
                                        d: "M"
                                            .concat(R.x, ",")
                                            .concat(R.y, " L")
                                            .concat(p.x, ",")
                                            .concat(p.y, " L")
                                            .concat(O.x, ",")
                                            .concat(O.y),
                                    });
                                }
                            }
                        },
                        S = function (e, t, n, r) {
                            m(
                                e,
                                Object.assign({}, e.styles, {
                                    fill: "none",
                                    d: _(
                                        t.points.map(function (e) {
                                            return {
                                                x: d(e.x, n, r, "width"),
                                                y: d(e.y, n, r, "height"),
                                            };
                                        })
                                    ),
                                })
                            );
                        },
                        w = function (e) {
                            return function (t) {
                                return I(e, { id: t.id });
                            };
                        },
                        L = function (e) {
                            var t = I("g", {
                                    id: e.id,
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                }),
                                n = I("line");
                            t.appendChild(n);
                            var r = I("path");
                            t.appendChild(r);
                            var i = I("path");
                            return t.appendChild(i), t;
                        },
                        M = {
                            image: function (e) {
                                var t = I("image", {
                                    id: e.id,
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    opacity: "0",
                                });
                                return (
                                    (t.onload = function () {
                                        t.setAttribute(
                                            "opacity",
                                            e.opacity || 1
                                        );
                                    }),
                                    t.setAttributeNS(
                                        "http://www.w3.org/1999/xlink",
                                        "xlink:href",
                                        e.src
                                    ),
                                    t
                                );
                            },
                            rect: w("rect"),
                            ellipse: w("ellipse"),
                            text: w("text"),
                            path: w("path"),
                            line: L,
                        },
                        P = {
                            rect: T,
                            ellipse: v,
                            image: R,
                            text: A,
                            path: S,
                            line: D,
                        },
                        b = function (e, t) {
                            return M[e](t);
                        },
                        C = function (e, t, n, r, i) {
                            "path" !== t && (e.rect = h(n, r, i)),
                                (e.styles = p(n, r, i)),
                                P[t](e, n, r, i);
                        },
                        N = [
                            "x",
                            "y",
                            "left",
                            "top",
                            "right",
                            "bottom",
                            "width",
                            "height",
                        ],
                        G = function (e) {
                            return "string" == typeof e && /%/.test(e)
                                ? parseFloat(e) / 100
                                : e;
                        },
                        x = function (e) {
                            var t = r(e, 2),
                                n = t[0],
                                i = t[1],
                                o = i.points
                                    ? {}
                                    : N.reduce(function (e, t) {
                                          return (e[t] = G(i[t])), e;
                                      }, {});
                            return [n, Object.assign({ zIndex: 0 }, i, o)];
                        },
                        F = function (e, t) {
                            return e[1].zIndex > t[1].zIndex
                                ? 1
                                : e[1].zIndex < t[1].zIndex
                                ? -1
                                : 0;
                        },
                        U = function (e) {
                            return e.utils.createView({
                                name: "image-preview-markup",
                                tag: "svg",
                                ignoreRect: !0,
                                mixins: {
                                    apis: [
                                        "width",
                                        "height",
                                        "crop",
                                        "markup",
                                        "resize",
                                        "dirty",
                                    ],
                                },
                                write: function (e) {
                                    var t = e.root,
                                        n = e.props;
                                    if (n.dirty) {
                                        var i = n.crop,
                                            o = n.resize,
                                            a = n.markup,
                                            s = n.width,
                                            u = n.height,
                                            l = i.width,
                                            c = i.height;
                                        if (o) {
                                            var f = o.size,
                                                d = f && f.width,
                                                p = f && f.height,
                                                E = o.mode,
                                                h = o.upscale;
                                            d && !p && (p = d),
                                                p && !d && (d = p);
                                            var _ = l < d && c < p;
                                            if (!_ || (_ && h)) {
                                                var m,
                                                    g = d / l,
                                                    I = p / c;
                                                "force" === E
                                                    ? ((l = d), (c = p))
                                                    : ("cover" === E
                                                          ? (m = Math.max(g, I))
                                                          : "contain" === E &&
                                                            (m = Math.min(
                                                                g,
                                                                I
                                                            )),
                                                      (l *= m),
                                                      (c *= m));
                                            }
                                        }
                                        var T = { width: s, height: u };
                                        t.element.setAttribute(
                                            "width",
                                            T.width
                                        ),
                                            t.element.setAttribute(
                                                "height",
                                                T.height
                                            );
                                        var v = Math.min(s / l, u / c);
                                        t.element.innerHTML = "";
                                        var y = t.query(
                                            "GET_IMAGE_PREVIEW_MARKUP_FILTER"
                                        );
                                        a.filter(y)
                                            .map(x)
                                            .sort(F)
                                            .forEach(function (e) {
                                                var n = r(e, 2),
                                                    i = n[0],
                                                    o = n[1],
                                                    a = b(i, o);
                                                C(a, i, o, T, v),
                                                    t.element.appendChild(a);
                                            });
                                    }
                                },
                            });
                        },
                        B = function (e, t) {
                            return { x: e, y: t };
                        },
                        V = function (e, t) {
                            return e.x * t.x + e.y * t.y;
                        },
                        q = function (e, t) {
                            return B(e.x - t.x, e.y - t.y);
                        },
                        k = function (e, t) {
                            return V(q(e, t), q(e, t));
                        },
                        Y = function (e, t) {
                            return Math.sqrt(k(e, t));
                        },
                        z = function (e, t) {
                            var n = e,
                                r = 1.5707963267948966,
                                i = t,
                                o = 1.5707963267948966 - t,
                                a = Math.sin(r),
                                s = Math.sin(i),
                                u = Math.sin(o),
                                l = Math.cos(o),
                                c = n / a;
                            return B(l * (c * s), l * (c * u));
                        },
                        W = function (e, t) {
                            var n = e.width,
                                r = e.height,
                                i = z(n, t),
                                o = z(r, t),
                                a = B(e.x + Math.abs(i.x), e.y - Math.abs(i.y)),
                                s = B(
                                    e.x + e.width + Math.abs(o.y),
                                    e.y + Math.abs(o.x)
                                ),
                                u = B(
                                    e.x - Math.abs(o.y),
                                    e.y + e.height - Math.abs(o.x)
                                );
                            return { width: Y(a, s), height: Y(a, u) };
                        },
                        j = function (e, t) {
                            var n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 1,
                                r = e.height / e.width,
                                i = 1,
                                o = t,
                                a = 1,
                                s = r;
                            s > o && (a = (s = o) / r);
                            var u = Math.max(i / a, o / s),
                                l = e.width / (n * u * a);
                            return { width: l, height: l * t };
                        },
                        H = function (e, t, n, r) {
                            var i = r.x > 0.5 ? 1 - r.x : r.x,
                                o = r.y > 0.5 ? 1 - r.y : r.y,
                                a = 2 * i * e.width,
                                s = 2 * o * e.height,
                                u = W(t, n);
                            return Math.max(u.width / a, u.height / s);
                        },
                        X = function (e, t) {
                            var n = e.width,
                                r = n * t;
                            return (
                                r > e.height && (n = (r = e.height) / t),
                                {
                                    x: 0.5 * (e.width - n),
                                    y: 0.5 * (e.height - r),
                                    width: n,
                                    height: r,
                                }
                            );
                        },
                        Z = function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {},
                                n = t.zoom,
                                r = t.rotation,
                                i = t.center,
                                o = t.aspectRatio;
                            o || (o = e.height / e.width);
                            var a = j(e, o, n),
                                s = { x: 0.5 * a.width, y: 0.5 * a.height },
                                u = {
                                    x: 0,
                                    y: 0,
                                    width: a.width,
                                    height: a.height,
                                    center: s,
                                },
                                l = void 0 === t.scaleToFit || t.scaleToFit,
                                c =
                                    n *
                                    H(
                                        e,
                                        X(u, o),
                                        r,
                                        l ? i : { x: 0.5, y: 0.5 }
                                    );
                            return {
                                widthFloat: a.width / c,
                                heightFloat: a.height / c,
                                width: Math.round(a.width / c),
                                height: Math.round(a.height / c),
                            };
                        },
                        Q = {
                            type: "spring",
                            stiffness: 0.5,
                            damping: 0.45,
                            mass: 10,
                        },
                        K = function (e) {
                            return e.utils.createView({
                                name: "image-bitmap",
                                ignoreRect: !0,
                                mixins: { styles: ["scaleX", "scaleY"] },
                                create: function (e) {
                                    var t = e.root,
                                        n = e.props;
                                    t.appendChild(n.image);
                                },
                            });
                        },
                        $ = function (e) {
                            return e.utils.createView({
                                name: "image-canvas-wrapper",
                                tag: "div",
                                ignoreRect: !0,
                                mixins: {
                                    apis: ["crop", "width", "height"],
                                    styles: [
                                        "originX",
                                        "originY",
                                        "translateX",
                                        "translateY",
                                        "scaleX",
                                        "scaleY",
                                        "rotateZ",
                                    ],
                                    animations: {
                                        originX: Q,
                                        originY: Q,
                                        scaleX: Q,
                                        scaleY: Q,
                                        translateX: Q,
                                        translateY: Q,
                                        rotateZ: Q,
                                    },
                                },
                                create: function (t) {
                                    var n = t.root,
                                        r = t.props;
                                    (r.width = r.image.width),
                                        (r.height = r.image.height),
                                        (n.ref.bitmap = n.appendChildView(
                                            n.createChildView(K(e), {
                                                image: r.image,
                                            })
                                        ));
                                },
                                write: function (e) {
                                    var t = e.root,
                                        n = e.props.crop.flip,
                                        r = t.ref.bitmap;
                                    (r.scaleX = n.horizontal ? -1 : 1),
                                        (r.scaleY = n.vertical ? -1 : 1);
                                },
                            });
                        },
                        J = function (e) {
                            return e.utils.createView({
                                name: "image-clip",
                                tag: "div",
                                ignoreRect: !0,
                                mixins: {
                                    apis: [
                                        "crop",
                                        "markup",
                                        "resize",
                                        "width",
                                        "height",
                                        "dirty",
                                        "background",
                                    ],
                                    styles: ["width", "height", "opacity"],
                                    animations: {
                                        opacity: {
                                            type: "tween",
                                            duration: 250,
                                        },
                                    },
                                },
                                didWriteView: function (e) {
                                    var t = e.root,
                                        n = e.props;
                                    n.background &&
                                        (t.element.style.backgroundColor =
                                            n.background);
                                },
                                create: function (t) {
                                    var n = t.root,
                                        r = t.props;
                                    (n.ref.image = n.appendChildView(
                                        n.createChildView(
                                            $(e),
                                            Object.assign({}, r)
                                        )
                                    )),
                                        (n.ref.createMarkup = function () {
                                            n.ref.markup ||
                                                (n.ref.markup =
                                                    n.appendChildView(
                                                        n.createChildView(
                                                            U(e),
                                                            Object.assign({}, r)
                                                        )
                                                    ));
                                        }),
                                        (n.ref.destroyMarkup = function () {
                                            n.ref.markup &&
                                                (n.removeChildView(
                                                    n.ref.markup
                                                ),
                                                (n.ref.markup = null));
                                        });
                                    var i = n.query(
                                        "GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR"
                                    );
                                    null !== i &&
                                        (n.element.dataset.transparencyIndicator =
                                            "grid" === i ? i : "color");
                                },
                                write: function (e) {
                                    var t = e.root,
                                        n = e.props,
                                        r = e.shouldOptimize,
                                        i = n.crop,
                                        o = n.markup,
                                        a = n.resize,
                                        s = n.dirty,
                                        u = n.width,
                                        l = n.height;
                                    t.ref.image.crop = i;
                                    var c = {
                                            x: 0,
                                            y: 0,
                                            width: u,
                                            height: l,
                                            center: { x: 0.5 * u, y: 0.5 * l },
                                        },
                                        f = {
                                            width: t.ref.image.width,
                                            height: t.ref.image.height,
                                        },
                                        d = {
                                            x: i.center.x * f.width,
                                            y: i.center.y * f.height,
                                        },
                                        p = {
                                            x:
                                                c.center.x -
                                                f.width * i.center.x,
                                            y:
                                                c.center.y -
                                                f.height * i.center.y,
                                        },
                                        E =
                                            2 * Math.PI +
                                            (i.rotation % (2 * Math.PI)),
                                        h = i.aspectRatio || f.height / f.width,
                                        _ =
                                            void 0 === i.scaleToFit ||
                                            i.scaleToFit,
                                        m = H(
                                            f,
                                            X(c, h),
                                            E,
                                            _ ? i.center : { x: 0.5, y: 0.5 }
                                        ),
                                        g = i.zoom * m;
                                    o && o.length
                                        ? (t.ref.createMarkup(),
                                          (t.ref.markup.width = u),
                                          (t.ref.markup.height = l),
                                          (t.ref.markup.resize = a),
                                          (t.ref.markup.dirty = s),
                                          (t.ref.markup.markup = o),
                                          (t.ref.markup.crop = Z(f, i)))
                                        : t.ref.markup && t.ref.destroyMarkup();
                                    var I = t.ref.image;
                                    if (r)
                                        return (
                                            (I.originX = null),
                                            (I.originY = null),
                                            (I.translateX = null),
                                            (I.translateY = null),
                                            (I.rotateZ = null),
                                            (I.scaleX = null),
                                            void (I.scaleY = null)
                                        );
                                    (I.originX = d.x),
                                        (I.originY = d.y),
                                        (I.translateX = p.x),
                                        (I.translateY = p.y),
                                        (I.rotateZ = E),
                                        (I.scaleX = g),
                                        (I.scaleY = g);
                                },
                            });
                        },
                        ee = function (e) {
                            return e.utils.createView({
                                name: "image-preview",
                                tag: "div",
                                ignoreRect: !0,
                                mixins: {
                                    apis: [
                                        "image",
                                        "crop",
                                        "markup",
                                        "resize",
                                        "dirty",
                                        "background",
                                    ],
                                    styles: [
                                        "translateY",
                                        "scaleX",
                                        "scaleY",
                                        "opacity",
                                    ],
                                    animations: {
                                        scaleX: Q,
                                        scaleY: Q,
                                        translateY: Q,
                                        opacity: {
                                            type: "tween",
                                            duration: 400,
                                        },
                                    },
                                },
                                create: function (t) {
                                    var n = t.root,
                                        r = t.props;
                                    n.ref.clip = n.appendChildView(
                                        n.createChildView(J(e), {
                                            id: r.id,
                                            image: r.image,
                                            crop: r.crop,
                                            markup: r.markup,
                                            resize: r.resize,
                                            dirty: r.dirty,
                                            background: r.background,
                                        })
                                    );
                                },
                                write: function (e) {
                                    var t = e.root,
                                        n = e.props,
                                        r = e.shouldOptimize,
                                        i = t.ref.clip,
                                        o = n.image,
                                        a = n.crop,
                                        s = n.markup,
                                        u = n.resize,
                                        l = n.dirty;
                                    if (
                                        ((i.crop = a),
                                        (i.markup = s),
                                        (i.resize = u),
                                        (i.dirty = l),
                                        (i.opacity = r ? 0 : 1),
                                        !r && !t.rect.element.hidden)
                                    ) {
                                        var c = o.height / o.width,
                                            f = a.aspectRatio || c,
                                            d = t.rect.inner.width,
                                            p = t.rect.inner.height,
                                            E = t.query(
                                                "GET_IMAGE_PREVIEW_HEIGHT"
                                            ),
                                            h = t.query(
                                                "GET_IMAGE_PREVIEW_MIN_HEIGHT"
                                            ),
                                            _ = t.query(
                                                "GET_IMAGE_PREVIEW_MAX_HEIGHT"
                                            ),
                                            m = t.query(
                                                "GET_PANEL_ASPECT_RATIO"
                                            ),
                                            g = t.query("GET_ALLOW_MULTIPLE");
                                        m && !g && ((E = d * m), (f = m));
                                        var I =
                                                null !== E
                                                    ? E
                                                    : Math.max(
                                                          h,
                                                          Math.min(d * f, _)
                                                      ),
                                            T = I / f;
                                        T > d && (I = (T = d) * f),
                                            I > p && ((I = p), (T = p / f)),
                                            (i.width = T),
                                            (i.height = I);
                                    }
                                },
                            });
                        },
                        te =
                            '<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">\n    <defs>\n        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">\n            <stop offset=\'50%\' stop-color=\'#000000\'/>\n            <stop offset=\'56%\' stop-color=\'#0a0a0a\'/>\n            <stop offset=\'63%\' stop-color=\'#262626\'/>\n            <stop offset=\'69%\' stop-color=\'#4f4f4f\'/>\n            <stop offset=\'75%\' stop-color=\'#808080\'/>\n            <stop offset=\'81%\' stop-color=\'#b1b1b1\'/>\n            <stop offset=\'88%\' stop-color=\'#dadada\'/>\n            <stop offset=\'94%\' stop-color=\'#f6f6f6\'/>\n            <stop offset=\'100%\' stop-color=\'#ffffff\'/>\n        </radialGradient>\n        <mask id="mask-__UID__">\n            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>\n        </mask>\n    </defs>\n    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>\n</svg>',
                        ne = 0,
                        re = function (e) {
                            return e.utils.createView({
                                name: "image-preview-overlay",
                                tag: "div",
                                ignoreRect: !0,
                                create: function (e) {
                                    var t = e.root,
                                        n = e.props,
                                        r = te;
                                    if (document.querySelector("base")) {
                                        var i = new URL(
                                            window.location.href.replace(
                                                window.location.hash,
                                                ""
                                            )
                                        ).href;
                                        r = r.replace(
                                            /url\(\#/g,
                                            "url(" + i + "#"
                                        );
                                    }
                                    ne++,
                                        t.element.classList.add(
                                            "filepond--image-preview-overlay-".concat(
                                                n.status
                                            )
                                        ),
                                        (t.element.innerHTML = r.replace(
                                            /__UID__/g,
                                            ne
                                        ));
                                },
                                mixins: {
                                    styles: ["opacity"],
                                    animations: {
                                        opacity: { type: "spring", mass: 25 },
                                    },
                                },
                            });
                        },
                        ie = function () {
                            self.onmessage = function (e) {
                                createImageBitmap(e.data.message.file).then(
                                    function (t) {
                                        self.postMessage(
                                            { id: e.data.id, message: t },
                                            [t]
                                        );
                                    }
                                );
                            };
                        },
                        oe = function () {
                            self.onmessage = function (e) {
                                for (
                                    var t = e.data.message.imageData,
                                        n = e.data.message.colorMatrix,
                                        r = t.data,
                                        i = r.length,
                                        o = n[0],
                                        a = n[1],
                                        s = n[2],
                                        u = n[3],
                                        l = n[4],
                                        c = n[5],
                                        f = n[6],
                                        d = n[7],
                                        p = n[8],
                                        E = n[9],
                                        h = n[10],
                                        _ = n[11],
                                        m = n[12],
                                        g = n[13],
                                        I = n[14],
                                        T = n[15],
                                        v = n[16],
                                        y = n[17],
                                        R = n[18],
                                        O = n[19],
                                        A = 0,
                                        D = 0,
                                        S = 0,
                                        w = 0,
                                        L = 0;
                                    A < i;
                                    A += 4
                                )
                                    (D = r[A] / 255),
                                        (S = r[A + 1] / 255),
                                        (w = r[A + 2] / 255),
                                        (L = r[A + 3] / 255),
                                        (r[A] = Math.max(
                                            0,
                                            Math.min(
                                                255 *
                                                    (D * o +
                                                        S * a +
                                                        w * s +
                                                        L * u +
                                                        l),
                                                255
                                            )
                                        )),
                                        (r[A + 1] = Math.max(
                                            0,
                                            Math.min(
                                                255 *
                                                    (D * c +
                                                        S * f +
                                                        w * d +
                                                        L * p +
                                                        E),
                                                255
                                            )
                                        )),
                                        (r[A + 2] = Math.max(
                                            0,
                                            Math.min(
                                                255 *
                                                    (D * h +
                                                        S * _ +
                                                        w * m +
                                                        L * g +
                                                        I),
                                                255
                                            )
                                        )),
                                        (r[A + 3] = Math.max(
                                            0,
                                            Math.min(
                                                255 *
                                                    (D * T +
                                                        S * v +
                                                        w * y +
                                                        L * R +
                                                        O),
                                                255
                                            )
                                        ));
                                self.postMessage(
                                    { id: e.data.id, message: t },
                                    [t.data.buffer]
                                );
                            };
                        },
                        ae = function (e, t) {
                            var n = new Image();
                            (n.onload = function () {
                                var e = n.naturalWidth,
                                    r = n.naturalHeight;
                                (n = null), t(e, r);
                            }),
                                (n.src = e);
                        },
                        se = {
                            1: function () {
                                return [1, 0, 0, 1, 0, 0];
                            },
                            2: function (e) {
                                return [-1, 0, 0, 1, e, 0];
                            },
                            3: function (e, t) {
                                return [-1, 0, 0, -1, e, t];
                            },
                            4: function (e, t) {
                                return [1, 0, 0, -1, 0, t];
                            },
                            5: function () {
                                return [0, 1, 1, 0, 0, 0];
                            },
                            6: function (e, t) {
                                return [0, 1, -1, 0, t, 0];
                            },
                            7: function (e, t) {
                                return [0, -1, -1, 0, t, e];
                            },
                            8: function (e) {
                                return [0, -1, 1, 0, 0, e];
                            },
                        },
                        ue = function (e, t, n, r) {
                            -1 !== r && e.transform.apply(e, se[r](t, n));
                        },
                        le = function (e, t, n, r) {
                            (t = Math.round(t)), (n = Math.round(n));
                            var i = document.createElement("canvas");
                            (i.width = t), (i.height = n);
                            var o = i.getContext("2d");
                            if (r >= 5 && r <= 8) {
                                var a = [n, t];
                                (t = a[0]), (n = a[1]);
                            }
                            return (
                                ue(o, t, n, r), o.drawImage(e, 0, 0, t, n), i
                            );
                        },
                        ce = function (e) {
                            return /^image/.test(e.type) && !/svg/.test(e.type);
                        },
                        fe = 10,
                        de = 10,
                        pe = function (e) {
                            var t = Math.min(fe / e.width, de / e.height),
                                n = document.createElement("canvas"),
                                r = n.getContext("2d"),
                                i = (n.width = Math.ceil(e.width * t)),
                                o = (n.height = Math.ceil(e.height * t));
                            r.drawImage(e, 0, 0, i, o);
                            var a = null;
                            try {
                                a = r.getImageData(0, 0, i, o).data;
                            } catch (e) {
                                return null;
                            }
                            for (
                                var s = a.length, u = 0, l = 0, c = 0, f = 0;
                                f < s;
                                f += 4
                            )
                                (u += a[f] * a[f]),
                                    (l += a[f + 1] * a[f + 1]),
                                    (c += a[f + 2] * a[f + 2]);
                            return {
                                r: (u = Ee(u, s)),
                                g: (l = Ee(l, s)),
                                b: (c = Ee(c, s)),
                            };
                        },
                        Ee = function (e, t) {
                            return Math.floor(Math.sqrt(e / (t / 4)));
                        },
                        he = function (e, t) {
                            return (
                                ((t =
                                    t ||
                                    document.createElement("canvas")).width =
                                    e.width),
                                (t.height = e.height),
                                t.getContext("2d").drawImage(e, 0, 0),
                                t
                            );
                        },
                        _e = function (e) {
                            var t;
                            try {
                                t = new ImageData(e.width, e.height);
                            } catch (n) {
                                t = document
                                    .createElement("canvas")
                                    .getContext("2d")
                                    .createImageData(e.width, e.height);
                            }
                            return t.data.set(new Uint8ClampedArray(e.data)), t;
                        },
                        me = function (e) {
                            return new Promise(function (t, n) {
                                var r = new Image();
                                (r.crossOrigin = "Anonymous"),
                                    (r.onload = function () {
                                        t(r);
                                    }),
                                    (r.onerror = function (e) {
                                        n(e);
                                    }),
                                    (r.src = e);
                            });
                        },
                        ge = function (e) {
                            var t = re(e),
                                n = ee(e),
                                r = e.utils.createWorker,
                                i = function (e, t, n) {
                                    return new Promise(function (i) {
                                        e.ref.imageData ||
                                            (e.ref.imageData = n
                                                .getContext("2d")
                                                .getImageData(
                                                    0,
                                                    0,
                                                    n.width,
                                                    n.height
                                                ));
                                        var o = _e(e.ref.imageData);
                                        if (!t || 20 !== t.length)
                                            return (
                                                n
                                                    .getContext("2d")
                                                    .putImageData(o, 0, 0),
                                                i()
                                            );
                                        var a = r(oe);
                                        a.post(
                                            { imageData: o, colorMatrix: t },
                                            function (e) {
                                                n
                                                    .getContext("2d")
                                                    .putImageData(e, 0, 0),
                                                    a.terminate(),
                                                    i();
                                            },
                                            [o.data.buffer]
                                        );
                                    });
                                },
                                o = function (e, t) {
                                    e.removeChildView(t),
                                        (t.image.width = 1),
                                        (t.image.height = 1),
                                        t._destroy();
                                },
                                a = function (e) {
                                    var t = e.root,
                                        n = t.ref.images.shift();
                                    return (
                                        (n.opacity = 0),
                                        (n.translateY = -15),
                                        t.ref.imageViewBin.push(n),
                                        n
                                    );
                                },
                                s = function (e) {
                                    var t = e.root,
                                        r = e.props,
                                        i = e.image,
                                        o = r.id,
                                        a = t.query("GET_ITEM", { id: o });
                                    if (a) {
                                        var s,
                                            u,
                                            l = a.getMetadata("crop") || {
                                                center: { x: 0.5, y: 0.5 },
                                                flip: {
                                                    horizontal: !1,
                                                    vertical: !1,
                                                },
                                                zoom: 1,
                                                rotation: 0,
                                                aspectRatio: null,
                                            },
                                            c = t.query(
                                                "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
                                            ),
                                            f = !1;
                                        t.query(
                                            "GET_IMAGE_PREVIEW_MARKUP_SHOW"
                                        ) &&
                                            ((s =
                                                a.getMetadata("markup") || []),
                                            (u = a.getMetadata("resize")),
                                            (f = !0));
                                        var d = t.appendChildView(
                                            t.createChildView(n, {
                                                id: o,
                                                image: i,
                                                crop: l,
                                                resize: u,
                                                markup: s,
                                                dirty: f,
                                                background: c,
                                                opacity: 0,
                                                scaleX: 1.15,
                                                scaleY: 1.15,
                                                translateY: 15,
                                            }),
                                            t.childViews.length
                                        );
                                        t.ref.images.push(d),
                                            (d.opacity = 1),
                                            (d.scaleX = 1),
                                            (d.scaleY = 1),
                                            (d.translateY = 0),
                                            setTimeout(function () {
                                                t.dispatch(
                                                    "DID_IMAGE_PREVIEW_SHOW",
                                                    { id: o }
                                                );
                                            }, 250);
                                    }
                                },
                                u = function (e) {
                                    var t = e.root,
                                        n = e.props,
                                        r = t.query("GET_ITEM", { id: n.id });
                                    if (r) {
                                        var i =
                                            t.ref.images[
                                                t.ref.images.length - 1
                                            ];
                                        (i.crop = r.getMetadata("crop")),
                                            (i.background = t.query(
                                                "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
                                            )),
                                            t.query(
                                                "GET_IMAGE_PREVIEW_MARKUP_SHOW"
                                            ) &&
                                                ((i.dirty = !0),
                                                (i.resize =
                                                    r.getMetadata("resize")),
                                                (i.markup =
                                                    r.getMetadata("markup")));
                                    }
                                },
                                l = function (e) {
                                    var t = e.root,
                                        n = e.props,
                                        r = e.action;
                                    if (
                                        /crop|filter|markup|resize/.test(
                                            r.change.key
                                        ) &&
                                        t.ref.images.length
                                    ) {
                                        var o = t.query("GET_ITEM", {
                                            id: n.id,
                                        });
                                        if (o)
                                            if (/filter/.test(r.change.key)) {
                                                var l =
                                                    t.ref.images[
                                                        t.ref.images.length - 1
                                                    ];
                                                i(t, r.change.value, l.image);
                                            } else if (
                                                /crop|markup|resize/.test(
                                                    r.change.key
                                                )
                                            ) {
                                                var c = o.getMetadata("crop"),
                                                    f =
                                                        t.ref.images[
                                                            t.ref.images
                                                                .length - 1
                                                        ];
                                                if (
                                                    c &&
                                                    c.aspectRatio &&
                                                    f.crop &&
                                                    f.crop.aspectRatio &&
                                                    Math.abs(
                                                        c.aspectRatio -
                                                            f.crop.aspectRatio
                                                    ) > 1e-5
                                                ) {
                                                    var d = a({ root: t });
                                                    s({
                                                        root: t,
                                                        props: n,
                                                        image: he(d.image),
                                                    });
                                                } else u({ root: t, props: n });
                                            }
                                    }
                                },
                                c = function (e) {
                                    var t =
                                        window.navigator.userAgent.match(
                                            /Firefox\/([0-9]+)\./
                                        );
                                    return (
                                        !((t ? parseInt(t[1]) : null) <= 58) &&
                                        "createImageBitmap" in window &&
                                        ce(e)
                                    );
                                },
                                f = function (e) {
                                    var t = e.root,
                                        n = e.props.id,
                                        r = t.query("GET_ITEM", n);
                                    if (r) {
                                        var i = URL.createObjectURL(r.file);
                                        ae(i, function (e, r) {
                                            t.dispatch(
                                                "DID_IMAGE_PREVIEW_CALCULATE_SIZE",
                                                { id: n, width: e, height: r }
                                            );
                                        });
                                    }
                                },
                                d = function (e) {
                                    var t = e.root,
                                        n = e.props,
                                        o = n.id,
                                        a = t.query("GET_ITEM", o);
                                    if (a) {
                                        var u = URL.createObjectURL(a.file),
                                            l = function () {
                                                me(u).then(f);
                                            },
                                            f = function (e) {
                                                URL.revokeObjectURL(u);
                                                var r =
                                                        (
                                                            a.getMetadata(
                                                                "exif"
                                                            ) || {}
                                                        ).orientation || -1,
                                                    o = e.width,
                                                    l = e.height;
                                                if (o && l) {
                                                    if (r >= 5 && r <= 8) {
                                                        var c = [l, o];
                                                        (o = c[0]), (l = c[1]);
                                                    }
                                                    var f = Math.max(
                                                            1,
                                                            0.75 *
                                                                window.devicePixelRatio
                                                        ),
                                                        d =
                                                            t.query(
                                                                "GET_IMAGE_PREVIEW_ZOOM_FACTOR"
                                                            ) * f,
                                                        p = l / o,
                                                        E =
                                                            t.rect.element
                                                                .width,
                                                        h =
                                                            t.rect.element
                                                                .height,
                                                        _ = E,
                                                        m = _ * p;
                                                    p > 1
                                                        ? (m =
                                                              (_ = Math.min(
                                                                  o,
                                                                  E * d
                                                              )) * p)
                                                        : (_ =
                                                              (m = Math.min(
                                                                  l,
                                                                  h * d
                                                              )) / p);
                                                    var g = le(e, _, m, r),
                                                        I = function () {
                                                            var r = t.query(
                                                                "GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR"
                                                            )
                                                                ? pe(data)
                                                                : null;
                                                            a.setMetadata(
                                                                "color",
                                                                r,
                                                                !0
                                                            ),
                                                                "close" in e &&
                                                                    e.close(),
                                                                (t.ref.overlayShadow.opacity = 1),
                                                                s({
                                                                    root: t,
                                                                    props: n,
                                                                    image: g,
                                                                });
                                                        },
                                                        T =
                                                            a.getMetadata(
                                                                "filter"
                                                            );
                                                    T
                                                        ? i(t, T, g).then(I)
                                                        : I();
                                                }
                                            };
                                        if (c(a.file)) {
                                            var d = r(ie);
                                            d.post(
                                                { file: a.file },
                                                function (e) {
                                                    d.terminate(),
                                                        e ? f(e) : l();
                                                }
                                            );
                                        } else l();
                                    }
                                },
                                p = function (e) {
                                    var t = e.root,
                                        n =
                                            t.ref.images[
                                                t.ref.images.length - 1
                                            ];
                                    (n.translateY = 0),
                                        (n.scaleX = 1),
                                        (n.scaleY = 1),
                                        (n.opacity = 1);
                                },
                                E = function (e) {
                                    var t = e.root;
                                    (t.ref.overlayShadow.opacity = 1),
                                        (t.ref.overlayError.opacity = 0),
                                        (t.ref.overlaySuccess.opacity = 0);
                                },
                                h = function (e) {
                                    var t = e.root;
                                    (t.ref.overlayShadow.opacity = 0.25),
                                        (t.ref.overlayError.opacity = 1);
                                },
                                _ = function (e) {
                                    var t = e.root;
                                    (t.ref.overlayShadow.opacity = 0.25),
                                        (t.ref.overlaySuccess.opacity = 1);
                                },
                                m = function (e) {
                                    var n = e.root;
                                    (n.ref.images = []),
                                        (n.ref.imageData = null),
                                        (n.ref.imageViewBin = []),
                                        (n.ref.overlayShadow =
                                            n.appendChildView(
                                                n.createChildView(t, {
                                                    opacity: 0,
                                                    status: "idle",
                                                })
                                            )),
                                        (n.ref.overlaySuccess =
                                            n.appendChildView(
                                                n.createChildView(t, {
                                                    opacity: 0,
                                                    status: "success",
                                                })
                                            )),
                                        (n.ref.overlayError = n.appendChildView(
                                            n.createChildView(t, {
                                                opacity: 0,
                                                status: "failure",
                                            })
                                        ));
                                };
                            return e.utils.createView({
                                name: "image-preview-wrapper",
                                create: m,
                                styles: ["height"],
                                apis: ["height"],
                                destroy: function (e) {
                                    e.root.ref.images.forEach(function (e) {
                                        (e.image.width = 1),
                                            (e.image.height = 1);
                                    });
                                },
                                didWriteView: function (e) {
                                    e.root.ref.images.forEach(function (e) {
                                        e.dirty = !1;
                                    });
                                },
                                write: e.utils.createRoute(
                                    {
                                        DID_IMAGE_PREVIEW_DRAW: p,
                                        DID_IMAGE_PREVIEW_CONTAINER_CREATE: f,
                                        DID_FINISH_CALCULATE_PREVIEWSIZE: d,
                                        DID_UPDATE_ITEM_METADATA: l,
                                        DID_THROW_ITEM_LOAD_ERROR: h,
                                        DID_THROW_ITEM_PROCESSING_ERROR: h,
                                        DID_THROW_ITEM_INVALID: h,
                                        DID_COMPLETE_ITEM_PROCESSING: _,
                                        DID_START_ITEM_PROCESSING: E,
                                        DID_REVERT_ITEM_PROCESSING: E,
                                    },
                                    function (e) {
                                        var t = e.root,
                                            n = t.ref.imageViewBin.filter(
                                                function (e) {
                                                    return 0 === e.opacity;
                                                }
                                            );
                                        (t.ref.imageViewBin =
                                            t.ref.imageViewBin.filter(function (
                                                e
                                            ) {
                                                return e.opacity > 0;
                                            })),
                                            n.forEach(function (e) {
                                                return o(t, e);
                                            }),
                                            (n.length = 0);
                                    }
                                ),
                            });
                        },
                        Ie = function (t) {
                            var n = t.addFilter,
                                r = t.utils,
                                i = r.Type,
                                o = r.createRoute,
                                a = r.isFile,
                                s = ge(t);
                            return (
                                n("CREATE_VIEW", function (t) {
                                    var n = t.is,
                                        r = t.view,
                                        i = t.query;
                                    if (
                                        n("file") &&
                                        i("GET_ALLOW_IMAGE_PREVIEW")
                                    ) {
                                        var u = function (t) {
                                                var n = t.root,
                                                    o = t.props.id,
                                                    u = i("GET_ITEM", o);
                                                if (
                                                    u &&
                                                    a(u.file) &&
                                                    !u.archived
                                                ) {
                                                    var l = u.file;
                                                    if (
                                                        e(l) &&
                                                        i(
                                                            "GET_IMAGE_PREVIEW_FILTER_ITEM"
                                                        )(u)
                                                    ) {
                                                        var c =
                                                                "createImageBitmap" in
                                                                (window || {}),
                                                            f = i(
                                                                "GET_IMAGE_PREVIEW_MAX_FILE_SIZE"
                                                            );
                                                        if (
                                                            !(
                                                                !c &&
                                                                f &&
                                                                l.size > f
                                                            )
                                                        ) {
                                                            n.ref.imagePreview =
                                                                r.appendChildView(
                                                                    r.createChildView(
                                                                        s,
                                                                        {
                                                                            id: o,
                                                                        }
                                                                    )
                                                                );
                                                            var d = n.query(
                                                                "GET_IMAGE_PREVIEW_HEIGHT"
                                                            );
                                                            d &&
                                                                n.dispatch(
                                                                    "DID_UPDATE_PANEL_HEIGHT",
                                                                    {
                                                                        id: u.id,
                                                                        height: d,
                                                                    }
                                                                );
                                                            var p =
                                                                !c &&
                                                                l.size >
                                                                    i(
                                                                        "GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE"
                                                                    );
                                                            n.dispatch(
                                                                "DID_IMAGE_PREVIEW_CONTAINER_CREATE",
                                                                { id: o },
                                                                p
                                                            );
                                                        }
                                                    }
                                                }
                                            },
                                            l = function (e, t) {
                                                if (e.ref.imagePreview) {
                                                    var n = t.id,
                                                        r = e.query(
                                                            "GET_ITEM",
                                                            { id: n }
                                                        );
                                                    if (r) {
                                                        var i = e.query(
                                                                "GET_PANEL_ASPECT_RATIO"
                                                            ),
                                                            o = e.query(
                                                                "GET_ITEM_PANEL_ASPECT_RATIO"
                                                            ),
                                                            a = e.query(
                                                                "GET_IMAGE_PREVIEW_HEIGHT"
                                                            );
                                                        if (!(i || o || a)) {
                                                            var s = e.ref,
                                                                u =
                                                                    s.imageWidth,
                                                                l =
                                                                    s.imageHeight;
                                                            if (u && l) {
                                                                var c = e.query(
                                                                        "GET_IMAGE_PREVIEW_MIN_HEIGHT"
                                                                    ),
                                                                    f = e.query(
                                                                        "GET_IMAGE_PREVIEW_MAX_HEIGHT"
                                                                    ),
                                                                    d =
                                                                        (
                                                                            r.getMetadata(
                                                                                "exif"
                                                                            ) ||
                                                                            {}
                                                                        )
                                                                            .orientation ||
                                                                        -1;
                                                                if (
                                                                    d >= 5 &&
                                                                    d <= 8
                                                                ) {
                                                                    var p = [
                                                                        l,
                                                                        u,
                                                                    ];
                                                                    (u = p[0]),
                                                                        (l =
                                                                            p[1]);
                                                                }
                                                                if (
                                                                    !ce(
                                                                        r.file
                                                                    ) ||
                                                                    e.query(
                                                                        "GET_IMAGE_PREVIEW_UPSCALE"
                                                                    )
                                                                ) {
                                                                    var E =
                                                                        2048 /
                                                                        u;
                                                                    (u *= E),
                                                                        (l *=
                                                                            E);
                                                                }
                                                                var h = l / u,
                                                                    _ =
                                                                        (
                                                                            r.getMetadata(
                                                                                "crop"
                                                                            ) ||
                                                                            {}
                                                                        )
                                                                            .aspectRatio ||
                                                                        h,
                                                                    m =
                                                                        Math.max(
                                                                            c,
                                                                            Math.min(
                                                                                l,
                                                                                f
                                                                            )
                                                                        ),
                                                                    g =
                                                                        e.rect
                                                                            .element
                                                                            .width,
                                                                    I =
                                                                        Math.min(
                                                                            g *
                                                                                _,
                                                                            m
                                                                        );
                                                                e.dispatch(
                                                                    "DID_UPDATE_PANEL_HEIGHT",
                                                                    {
                                                                        id: r.id,
                                                                        height: I,
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            c = function (e) {
                                                e.root.ref.shouldRescale = !0;
                                            },
                                            f = function (e) {
                                                var t = e.root;
                                                "crop" ===
                                                    e.action.change.key &&
                                                    (t.ref.shouldRescale = !0);
                                            },
                                            d = function (e) {
                                                var t = e.root,
                                                    n = e.action;
                                                (t.ref.imageWidth = n.width),
                                                    (t.ref.imageHeight =
                                                        n.height),
                                                    (t.ref.shouldRescale = !0),
                                                    (t.ref.shouldDrawPreview =
                                                        !0),
                                                    t.dispatch("KICK");
                                            };
                                        r.registerWriter(
                                            o(
                                                {
                                                    DID_RESIZE_ROOT: c,
                                                    DID_STOP_RESIZE: c,
                                                    DID_LOAD_ITEM: u,
                                                    DID_IMAGE_PREVIEW_CALCULATE_SIZE:
                                                        d,
                                                    DID_UPDATE_ITEM_METADATA: f,
                                                },
                                                function (e) {
                                                    var t = e.root,
                                                        n = e.props;
                                                    t.ref.imagePreview &&
                                                        (t.rect.element
                                                            .hidden ||
                                                            (t.ref
                                                                .shouldRescale &&
                                                                (l(t, n),
                                                                (t.ref.shouldRescale =
                                                                    !1)),
                                                            t.ref
                                                                .shouldDrawPreview &&
                                                                (requestAnimationFrame(
                                                                    function () {
                                                                        requestAnimationFrame(
                                                                            function () {
                                                                                t.dispatch(
                                                                                    "DID_FINISH_CALCULATE_PREVIEWSIZE",
                                                                                    {
                                                                                        id: n.id,
                                                                                    }
                                                                                );
                                                                            }
                                                                        );
                                                                    }
                                                                ),
                                                                (t.ref.shouldDrawPreview =
                                                                    !1))));
                                                }
                                            )
                                        );
                                    }
                                }),
                                {
                                    options: {
                                        allowImagePreview: [!0, i.BOOLEAN],
                                        imagePreviewFilterItem: [
                                            function () {
                                                return !0;
                                            },
                                            i.FUNCTION,
                                        ],
                                        imagePreviewHeight: [null, i.INT],
                                        imagePreviewMinHeight: [44, i.INT],
                                        imagePreviewMaxHeight: [256, i.INT],
                                        imagePreviewMaxFileSize: [null, i.INT],
                                        imagePreviewZoomFactor: [2, i.INT],
                                        imagePreviewUpscale: [!1, i.BOOLEAN],
                                        imagePreviewMaxInstantPreviewFileSize: [
                                            1e6,
                                            i.INT,
                                        ],
                                        imagePreviewTransparencyIndicator: [
                                            null,
                                            i.STRING,
                                        ],
                                        imagePreviewCalculateAverageImageColor:
                                            [!1, i.BOOLEAN],
                                        imagePreviewMarkupShow: [!0, i.BOOLEAN],
                                        imagePreviewMarkupFilter: [
                                            function () {
                                                return !0;
                                            },
                                            i.FUNCTION,
                                        ],
                                    },
                                }
                            );
                        };
                    return (
                        "undefined" != typeof window &&
                            void 0 !== window.document &&
                            document.dispatchEvent(
                                new CustomEvent("FilePond:pluginloaded", {
                                    detail: Ie,
                                })
                            ),
                        Ie
                    );
                })();
            },
            3567: function (e) {
                e.exports = (function () {
                    "use strict";
                    var e = function (e) {
                            return /^image/.test(e.type);
                        },
                        t = function (e, t) {
                            var n = new Image();
                            (n.onload = function () {
                                var e = n.naturalWidth,
                                    r = n.naturalHeight;
                                (n = null), t({ width: e, height: r });
                            }),
                                (n.onerror = function () {
                                    return t(null);
                                }),
                                (n.src = e);
                        },
                        n = function (n) {
                            var r = n.addFilter,
                                i = n.utils.Type;
                            return (
                                r("DID_LOAD_ITEM", function (n, r) {
                                    var i = r.query;
                                    return new Promise(function (r, o) {
                                        var a = n.file;
                                        if (
                                            !e(a) ||
                                            !i("GET_ALLOW_IMAGE_RESIZE")
                                        )
                                            return r(n);
                                        var s = i("GET_IMAGE_RESIZE_MODE"),
                                            u = i(
                                                "GET_IMAGE_RESIZE_TARGET_WIDTH"
                                            ),
                                            l = i(
                                                "GET_IMAGE_RESIZE_TARGET_HEIGHT"
                                            ),
                                            c = i("GET_IMAGE_RESIZE_UPSCALE");
                                        if (null === u && null === l)
                                            return r(n);
                                        var f = null === u ? l : u,
                                            d = null === l ? f : l,
                                            p = URL.createObjectURL(a);
                                        t(p, function (e) {
                                            if ((URL.revokeObjectURL(p), !e))
                                                return r(n);
                                            var t = e.width,
                                                i = e.height,
                                                o =
                                                    (
                                                        n.getMetadata("exif") ||
                                                        {}
                                                    ).orientation || -1;
                                            if (o >= 5 && o <= 8) {
                                                var a = [i, t];
                                                (t = a[0]), (i = a[1]);
                                            }
                                            if (t === f && i === d) return r(n);
                                            if (!c)
                                                if ("cover" === s) {
                                                    if (t <= f || i <= d)
                                                        return r(n);
                                                } else if (t <= f && i <= f)
                                                    return r(n);
                                            n.setMetadata("resize", {
                                                mode: s,
                                                upscale: c,
                                                size: { width: f, height: d },
                                            }),
                                                r(n);
                                        });
                                    });
                                }),
                                {
                                    options: {
                                        allowImageResize: [!0, i.BOOLEAN],
                                        imageResizeMode: ["cover", i.STRING],
                                        imageResizeUpscale: [!0, i.BOOLEAN],
                                        imageResizeTargetWidth: [null, i.INT],
                                        imageResizeTargetHeight: [null, i.INT],
                                    },
                                }
                            );
                        };
                    return (
                        "undefined" != typeof window &&
                            void 0 !== window.document &&
                            document.dispatchEvent(
                                new CustomEvent("FilePond:pluginloaded", {
                                    detail: n,
                                })
                            ),
                        n
                    );
                })();
            },
            6136: function (e, t) {
                !(function (e) {
                    "use strict";
                    var t = function (e) {
                            return e instanceof HTMLElement;
                        },
                        n = function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : [],
                                n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : [],
                                r = Object.assign({}, e),
                                i = [],
                                o = [],
                                a = function () {
                                    var e = [].concat(o);
                                    (o.length = 0),
                                        e.forEach(function (e) {
                                            var t = e.type,
                                                n = e.data;
                                            s(t, n);
                                        });
                                },
                                s = function (e, t, n) {
                                    !n || document.hidden
                                        ? (f[e] && f[e](t),
                                          i.push({ type: e, data: t }))
                                        : o.push({ type: e, data: t });
                                },
                                u = function (e) {
                                    for (
                                        var t,
                                            n = arguments.length,
                                            r = new Array(n > 1 ? n - 1 : 0),
                                            i = 1;
                                        i < n;
                                        i++
                                    )
                                        r[i - 1] = arguments[i];
                                    return c[e] ? (t = c)[e].apply(t, r) : null;
                                },
                                l = {
                                    getState: function () {
                                        return Object.assign({}, r);
                                    },
                                    processActionQueue: function () {
                                        var e = [].concat(i);
                                        return (i.length = 0), e;
                                    },
                                    processDispatchQueue: a,
                                    dispatch: s,
                                    query: u,
                                },
                                c = {};
                            t.forEach(function (e) {
                                c = Object.assign({}, e(r), {}, c);
                            });
                            var f = {};
                            return (
                                n.forEach(function (e) {
                                    f = Object.assign({}, e(s, u, r), {}, f);
                                }),
                                l
                            );
                        },
                        r = function (e, t, n) {
                            "function" != typeof n
                                ? Object.defineProperty(
                                      e,
                                      t,
                                      Object.assign({}, n)
                                  )
                                : (e[t] = n);
                        },
                        i = function (e, t) {
                            for (var n in e) e.hasOwnProperty(n) && t(n, e[n]);
                        },
                        o = function (e) {
                            var t = {};
                            return (
                                i(e, function (n) {
                                    r(t, n, e[n]);
                                }),
                                t
                            );
                        },
                        a = function (e, t) {
                            var n =
                                arguments.length > 2 && void 0 !== arguments[2]
                                    ? arguments[2]
                                    : null;
                            if (null === n)
                                return e.getAttribute(t) || e.hasAttribute(t);
                            e.setAttribute(t, n);
                        },
                        s = "http://www.w3.org/2000/svg",
                        u = ["svg", "path"],
                        l = function (e) {
                            return u.includes(e);
                        },
                        c = function (e, t) {
                            var n =
                                arguments.length > 2 && void 0 !== arguments[2]
                                    ? arguments[2]
                                    : {};
                            "object" == typeof t && ((n = t), (t = null));
                            var r = l(e)
                                ? document.createElementNS(s, e)
                                : document.createElement(e);
                            return (
                                t &&
                                    (l(e)
                                        ? a(r, "class", t)
                                        : (r.className = t)),
                                i(n, function (e, t) {
                                    a(r, e, t);
                                }),
                                r
                            );
                        },
                        f = function (e) {
                            return function (t, n) {
                                void 0 !== n && e.children[n]
                                    ? e.insertBefore(t, e.children[n])
                                    : e.appendChild(t);
                            };
                        },
                        d = function (e, t) {
                            return function (e, n) {
                                return (
                                    void 0 !== n
                                        ? t.splice(n, 0, e)
                                        : t.push(e),
                                    e
                                );
                            };
                        },
                        p = function (e, t) {
                            return function (n) {
                                return (
                                    t.splice(t.indexOf(n), 1),
                                    n.element.parentNode &&
                                        e.removeChild(n.element),
                                    n
                                );
                            };
                        },
                        E =
                            "undefined" != typeof window &&
                            void 0 !== window.document,
                        h = function () {
                            return E;
                        },
                        _ =
                            "children" in (h() ? c("svg") : {})
                                ? function (e) {
                                      return e.children.length;
                                  }
                                : function (e) {
                                      return e.childNodes.length;
                                  },
                        m = function (e, t, n, r) {
                            var i = n[0] || e.left,
                                o = n[1] || e.top,
                                a = i + e.width,
                                s = o + e.height * (r[1] || 1),
                                u = {
                                    element: Object.assign({}, e),
                                    inner: {
                                        left: e.left,
                                        top: e.top,
                                        right: e.right,
                                        bottom: e.bottom,
                                    },
                                    outer: {
                                        left: i,
                                        top: o,
                                        right: a,
                                        bottom: s,
                                    },
                                };
                            return (
                                t
                                    .filter(function (e) {
                                        return !e.isRectIgnored();
                                    })
                                    .map(function (e) {
                                        return e.rect;
                                    })
                                    .forEach(function (e) {
                                        g(u.inner, Object.assign({}, e.inner)),
                                            g(
                                                u.outer,
                                                Object.assign({}, e.outer)
                                            );
                                    }),
                                I(u.inner),
                                (u.outer.bottom += u.element.marginBottom),
                                (u.outer.right += u.element.marginRight),
                                I(u.outer),
                                u
                            );
                        },
                        g = function (e, t) {
                            (t.top += e.top),
                                (t.right += e.left),
                                (t.bottom += e.top),
                                (t.left += e.left),
                                t.bottom > e.bottom && (e.bottom = t.bottom),
                                t.right > e.right && (e.right = t.right);
                        },
                        I = function (e) {
                            (e.width = e.right - e.left),
                                (e.height = e.bottom - e.top);
                        },
                        T = function (e) {
                            return "number" == typeof e;
                        },
                        v = function (e, t, n) {
                            var r =
                                arguments.length > 3 && void 0 !== arguments[3]
                                    ? arguments[3]
                                    : 0.001;
                            return Math.abs(e - t) < r && Math.abs(n) < r;
                        },
                        y = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                t = e.stiffness,
                                n = void 0 === t ? 0.5 : t,
                                r = e.damping,
                                i = void 0 === r ? 0.75 : r,
                                a = e.mass,
                                s = void 0 === a ? 10 : a,
                                u = null,
                                l = null,
                                c = 0,
                                f = !1,
                                d = o({
                                    interpolate: function (e, t) {
                                        if (!f) {
                                            if (!T(u) || !T(l))
                                                return (f = !0), void (c = 0);
                                            v(
                                                (l += c += (-(l - u) * n) / s),
                                                u,
                                                (c *= i)
                                            ) || t
                                                ? ((l = u),
                                                  (c = 0),
                                                  (f = !0),
                                                  d.onupdate(l),
                                                  d.oncomplete(l))
                                                : d.onupdate(l);
                                        }
                                    },
                                    target: {
                                        set: function (e) {
                                            if (
                                                (T(e) && !T(l) && (l = e),
                                                null === u &&
                                                    ((u = e), (l = e)),
                                                l === (u = e) || void 0 === u)
                                            )
                                                return (
                                                    (f = !0),
                                                    (c = 0),
                                                    d.onupdate(l),
                                                    void d.oncomplete(l)
                                                );
                                            f = !1;
                                        },
                                        get: function () {
                                            return u;
                                        },
                                    },
                                    resting: {
                                        get: function () {
                                            return f;
                                        },
                                    },
                                    onupdate: function (e) {},
                                    oncomplete: function (e) {},
                                });
                            return d;
                        },
                        R = function (e) {
                            return e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1;
                        },
                        O = function () {
                            var e,
                                t,
                                n =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                r = n.duration,
                                i = void 0 === r ? 500 : r,
                                a = n.easing,
                                s = void 0 === a ? R : a,
                                u = n.delay,
                                l = void 0 === u ? 0 : u,
                                c = null,
                                f = !0,
                                d = !1,
                                p = null,
                                E = o({
                                    interpolate: function (n, r) {
                                        f ||
                                            null === p ||
                                            (null === c && (c = n),
                                            n - c < l ||
                                                ((e = n - c - l) >= i || r
                                                    ? ((e = 1),
                                                      (t = d ? 0 : 1),
                                                      E.onupdate(t * p),
                                                      E.oncomplete(t * p),
                                                      (f = !0))
                                                    : ((t = e / i),
                                                      E.onupdate(
                                                          (e >= 0
                                                              ? s(d ? 1 - t : t)
                                                              : 0) * p
                                                      ))));
                                    },
                                    target: {
                                        get: function () {
                                            return d ? 0 : p;
                                        },
                                        set: function (e) {
                                            if (null === p)
                                                return (
                                                    (p = e),
                                                    E.onupdate(e),
                                                    void E.oncomplete(e)
                                                );
                                            e < p
                                                ? ((p = 1), (d = !0))
                                                : ((d = !1), (p = e)),
                                                (f = !1),
                                                (c = null);
                                        },
                                    },
                                    resting: {
                                        get: function () {
                                            return f;
                                        },
                                    },
                                    onupdate: function (e) {},
                                    oncomplete: function (e) {},
                                });
                            return E;
                        },
                        A = { spring: y, tween: O },
                        D = function (e, t, n) {
                            var r =
                                    e[t] && "object" == typeof e[t][n]
                                        ? e[t][n]
                                        : e[t] || e,
                                i = "string" == typeof r ? r : r.type,
                                o =
                                    "object" == typeof r
                                        ? Object.assign({}, r)
                                        : {};
                            return A[i] ? A[i](o) : null;
                        },
                        S = function (e, t, n) {
                            var r =
                                arguments.length > 3 &&
                                void 0 !== arguments[3] &&
                                arguments[3];
                            (t = Array.isArray(t) ? t : [t]).forEach(function (
                                t
                            ) {
                                e.forEach(function (e) {
                                    var i = e,
                                        o = function () {
                                            return n[e];
                                        },
                                        a = function (t) {
                                            return (n[e] = t);
                                        };
                                    "object" == typeof e &&
                                        ((i = e.key),
                                        (o = e.getter || o),
                                        (a = e.setter || a)),
                                        (t[i] && !r) ||
                                            (t[i] = { get: o, set: a });
                                });
                            });
                        },
                        w = function (e) {
                            var t = e.mixinConfig,
                                n = e.viewProps,
                                r = e.viewInternalAPI,
                                o = e.viewExternalAPI,
                                a = Object.assign({}, n),
                                s = [];
                            return (
                                i(t, function (e, t) {
                                    var i = D(t);
                                    i &&
                                        ((i.onupdate = function (t) {
                                            n[e] = t;
                                        }),
                                        (i.target = a[e]),
                                        S(
                                            [
                                                {
                                                    key: e,
                                                    setter: function (e) {
                                                        i.target !== e &&
                                                            (i.target = e);
                                                    },
                                                    getter: function () {
                                                        return n[e];
                                                    },
                                                },
                                            ],
                                            [r, o],
                                            n,
                                            !0
                                        ),
                                        s.push(i));
                                }),
                                {
                                    write: function (e) {
                                        var t = document.hidden,
                                            n = !0;
                                        return (
                                            s.forEach(function (r) {
                                                r.resting || (n = !1),
                                                    r.interpolate(e, t);
                                            }),
                                            n
                                        );
                                    },
                                    destroy: function () {},
                                }
                            );
                        },
                        L = function (e) {
                            return function (t, n) {
                                e.addEventListener(t, n);
                            };
                        },
                        M = function (e) {
                            return function (t, n) {
                                e.removeEventListener(t, n);
                            };
                        },
                        P = function (e) {
                            e.mixinConfig, e.viewProps, e.viewInternalAPI;
                            var t = e.viewExternalAPI,
                                n = (e.viewState, e.view),
                                r = [],
                                i = L(n.element),
                                o = M(n.element);
                            return (
                                (t.on = function (e, t) {
                                    r.push({ type: e, fn: t }), i(e, t);
                                }),
                                (t.off = function (e, t) {
                                    r.splice(
                                        r.findIndex(function (n) {
                                            return n.type === e && n.fn === t;
                                        }),
                                        1
                                    ),
                                        o(e, t);
                                }),
                                {
                                    write: function () {
                                        return !0;
                                    },
                                    destroy: function () {
                                        r.forEach(function (e) {
                                            o(e.type, e.fn);
                                        });
                                    },
                                }
                            );
                        },
                        b = function (e) {
                            return null != e;
                        },
                        C = {
                            opacity: 1,
                            scaleX: 1,
                            scaleY: 1,
                            translateX: 0,
                            translateY: 0,
                            rotateX: 0,
                            rotateY: 0,
                            rotateZ: 0,
                            originX: 0,
                            originY: 0,
                        },
                        N = function (e) {
                            var t = e.mixinConfig,
                                n = e.viewProps,
                                r = e.viewInternalAPI,
                                i = e.viewExternalAPI,
                                o = e.view,
                                a = Object.assign({}, n),
                                s = {};
                            S(t, [r, i], n);
                            var u = function () {
                                    return [
                                        n.translateX || 0,
                                        n.translateY || 0,
                                    ];
                                },
                                l = function () {
                                    return [n.scaleX || 0, n.scaleY || 0];
                                },
                                c = function () {
                                    return o.rect
                                        ? m(o.rect, o.childViews, u(), l())
                                        : null;
                                };
                            return (
                                (r.rect = { get: c }),
                                (i.rect = { get: c }),
                                t.forEach(function (e) {
                                    n[e] = void 0 === a[e] ? C[e] : a[e];
                                }),
                                {
                                    write: function () {
                                        if (G(s, n))
                                            return (
                                                x(o.element, n),
                                                Object.assign(
                                                    s,
                                                    Object.assign({}, n)
                                                ),
                                                !0
                                            );
                                    },
                                    destroy: function () {},
                                }
                            );
                        },
                        G = function (e, t) {
                            if (Object.keys(e).length !== Object.keys(t).length)
                                return !0;
                            for (var n in t) if (t[n] !== e[n]) return !0;
                            return !1;
                        },
                        x = function (e, t) {
                            var n = t.opacity,
                                r = t.perspective,
                                i = t.translateX,
                                o = t.translateY,
                                a = t.scaleX,
                                s = t.scaleY,
                                u = t.rotateX,
                                l = t.rotateY,
                                c = t.rotateZ,
                                f = t.originX,
                                d = t.originY,
                                p = t.width,
                                E = t.height,
                                h = "",
                                _ = "";
                            (b(f) || b(d)) &&
                                (_ +=
                                    "transform-origin: " +
                                    (f || 0) +
                                    "px " +
                                    (d || 0) +
                                    "px;"),
                                b(r) && (h += "perspective(" + r + "px) "),
                                (b(i) || b(o)) &&
                                    (h +=
                                        "translate3d(" +
                                        (i || 0) +
                                        "px, " +
                                        (o || 0) +
                                        "px, 0) "),
                                (b(a) || b(s)) &&
                                    (h +=
                                        "scale3d(" +
                                        (b(a) ? a : 1) +
                                        ", " +
                                        (b(s) ? s : 1) +
                                        ", 1) "),
                                b(c) && (h += "rotateZ(" + c + "rad) "),
                                b(u) && (h += "rotateX(" + u + "rad) "),
                                b(l) && (h += "rotateY(" + l + "rad) "),
                                h.length && (_ += "transform:" + h + ";"),
                                b(n) &&
                                    ((_ += "opacity:" + n + ";"),
                                    0 === n && (_ += "visibility:hidden;"),
                                    n < 1 && (_ += "pointer-events:none;")),
                                b(E) && (_ += "height:" + E + "px;"),
                                b(p) && (_ += "width:" + p + "px;");
                            var m = e.elementCurrentStyle || "";
                            (_.length === m.length && _ === m) ||
                                ((e.style.cssText = _),
                                (e.elementCurrentStyle = _));
                        },
                        F = {
                            styles: N,
                            listeners: P,
                            animations: w,
                            apis: function (e) {
                                var t = e.mixinConfig,
                                    n = e.viewProps,
                                    r = e.viewExternalAPI;
                                S(t, r, n);
                            },
                        },
                        U = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {},
                                n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : {};
                            return (
                                t.layoutCalculated ||
                                    ((e.paddingTop =
                                        parseInt(n.paddingTop, 10) || 0),
                                    (e.marginTop =
                                        parseInt(n.marginTop, 10) || 0),
                                    (e.marginRight =
                                        parseInt(n.marginRight, 10) || 0),
                                    (e.marginBottom =
                                        parseInt(n.marginBottom, 10) || 0),
                                    (e.marginLeft =
                                        parseInt(n.marginLeft, 10) || 0),
                                    (t.layoutCalculated = !0)),
                                (e.left = t.offsetLeft || 0),
                                (e.top = t.offsetTop || 0),
                                (e.width = t.offsetWidth || 0),
                                (e.height = t.offsetHeight || 0),
                                (e.right = e.left + e.width),
                                (e.bottom = e.top + e.height),
                                (e.scrollTop = t.scrollTop),
                                (e.hidden = null === t.offsetParent),
                                e
                            );
                        },
                        B = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                t = e.tag,
                                n = void 0 === t ? "div" : t,
                                r = e.name,
                                i = void 0 === r ? null : r,
                                a = e.attributes,
                                s = void 0 === a ? {} : a,
                                u = e.read,
                                l = void 0 === u ? function () {} : u,
                                E = e.write,
                                h = void 0 === E ? function () {} : E,
                                g = e.create,
                                I = void 0 === g ? function () {} : g,
                                T = e.destroy,
                                v = void 0 === T ? function () {} : T,
                                y = e.filterFrameActionsForChild,
                                R =
                                    void 0 === y
                                        ? function (e, t) {
                                              return t;
                                          }
                                        : y,
                                O = e.didCreateView,
                                A = void 0 === O ? function () {} : O,
                                D = e.didWriteView,
                                S = void 0 === D ? function () {} : D,
                                w = e.ignoreRect,
                                L = void 0 !== w && w,
                                M = e.ignoreRectUpdate,
                                P = void 0 !== M && M,
                                b = e.mixins,
                                C = void 0 === b ? [] : b;
                            return function (e) {
                                var t =
                                        arguments.length > 1 &&
                                        void 0 !== arguments[1]
                                            ? arguments[1]
                                            : {},
                                    r = c(n, "filepond--" + i, s),
                                    a = window.getComputedStyle(r, null),
                                    u = U(),
                                    E = null,
                                    g = !1,
                                    T = [],
                                    y = [],
                                    O = {},
                                    D = {},
                                    w = [h],
                                    M = [l],
                                    b = [v],
                                    N = function () {
                                        return r;
                                    },
                                    G = function () {
                                        return T.concat();
                                    },
                                    x = function () {
                                        return O;
                                    },
                                    B = function (e) {
                                        return function (t, n) {
                                            return t(e, n);
                                        };
                                    },
                                    V = function () {
                                        return (
                                            E || (E = m(u, T, [0, 0], [1, 1]))
                                        );
                                    },
                                    q = function () {
                                        (E = null),
                                            T.forEach(function (e) {
                                                return e._read();
                                            }),
                                            !(P && u.width && u.height) &&
                                                U(u, r, a);
                                        var e = { root: X, props: t, rect: u };
                                        M.forEach(function (t) {
                                            return t(e);
                                        });
                                    },
                                    k = function (e, n, r) {
                                        var i = 0 === n.length;
                                        return (
                                            w.forEach(function (o) {
                                                !1 ===
                                                    o({
                                                        props: t,
                                                        root: X,
                                                        actions: n,
                                                        timestamp: e,
                                                        shouldOptimize: r,
                                                    }) && (i = !1);
                                            }),
                                            y.forEach(function (t) {
                                                !1 === t.write(e) && (i = !1);
                                            }),
                                            T.filter(function (e) {
                                                return !!e.element.parentNode;
                                            }).forEach(function (t) {
                                                t._write(e, R(t, n), r) ||
                                                    (i = !1);
                                            }),
                                            T.forEach(function (t, o) {
                                                t.element.parentNode ||
                                                    (X.appendChild(
                                                        t.element,
                                                        o
                                                    ),
                                                    t._read(),
                                                    t._write(e, R(t, n), r),
                                                    (i = !1));
                                            }),
                                            (g = i),
                                            S({
                                                props: t,
                                                root: X,
                                                actions: n,
                                                timestamp: e,
                                            }),
                                            i
                                        );
                                    },
                                    Y = function () {
                                        y.forEach(function (e) {
                                            return e.destroy();
                                        }),
                                            b.forEach(function (e) {
                                                e({ root: X, props: t });
                                            }),
                                            T.forEach(function (e) {
                                                return e._destroy();
                                            });
                                    },
                                    z = {
                                        element: { get: N },
                                        style: {
                                            get: function () {
                                                return a;
                                            },
                                        },
                                        childViews: { get: G },
                                    },
                                    W = Object.assign({}, z, {
                                        rect: { get: V },
                                        ref: { get: x },
                                        is: function (e) {
                                            return i === e;
                                        },
                                        appendChild: f(r),
                                        createChildView: B(e),
                                        linkView: function (e) {
                                            return T.push(e), e;
                                        },
                                        unlinkView: function (e) {
                                            T.splice(T.indexOf(e), 1);
                                        },
                                        appendChildView: d(r, T),
                                        removeChildView: p(r, T),
                                        registerWriter: function (e) {
                                            return w.push(e);
                                        },
                                        registerReader: function (e) {
                                            return M.push(e);
                                        },
                                        registerDestroyer: function (e) {
                                            return b.push(e);
                                        },
                                        invalidateLayout: function () {
                                            return (r.layoutCalculated = !1);
                                        },
                                        dispatch: e.dispatch,
                                        query: e.query,
                                    }),
                                    j = {
                                        element: { get: N },
                                        childViews: { get: G },
                                        rect: { get: V },
                                        resting: {
                                            get: function () {
                                                return g;
                                            },
                                        },
                                        isRectIgnored: function () {
                                            return L;
                                        },
                                        _read: q,
                                        _write: k,
                                        _destroy: Y,
                                    },
                                    H = Object.assign({}, z, {
                                        rect: {
                                            get: function () {
                                                return u;
                                            },
                                        },
                                    });
                                Object.keys(C)
                                    .sort(function (e, t) {
                                        return "styles" === e
                                            ? 1
                                            : "styles" === t
                                            ? -1
                                            : 0;
                                    })
                                    .forEach(function (e) {
                                        var n = F[e]({
                                            mixinConfig: C[e],
                                            viewProps: t,
                                            viewState: D,
                                            viewInternalAPI: W,
                                            viewExternalAPI: j,
                                            view: o(H),
                                        });
                                        n && y.push(n);
                                    });
                                var X = o(W);
                                I({ root: X, props: t });
                                var Z = _(r);
                                return (
                                    T.forEach(function (e, t) {
                                        X.appendChild(e.element, Z + t);
                                    }),
                                    A(X),
                                    o(j)
                                );
                            };
                        },
                        V = function (e, t) {
                            var n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 60,
                                r = "__framePainter";
                            if (window[r])
                                return (
                                    window[r].readers.push(e),
                                    void window[r].writers.push(t)
                                );
                            window[r] = { readers: [e], writers: [t] };
                            var i = window[r],
                                o = 1e3 / n,
                                a = null,
                                s = null,
                                u = null,
                                l = null,
                                c = function () {
                                    document.hidden
                                        ? ((u = function () {
                                              return window.setTimeout(
                                                  function () {
                                                      return f(
                                                          performance.now()
                                                      );
                                                  },
                                                  o
                                              );
                                          }),
                                          (l = function () {
                                              return window.clearTimeout(s);
                                          }))
                                        : ((u = function () {
                                              return window.requestAnimationFrame(
                                                  f
                                              );
                                          }),
                                          (l = function () {
                                              return window.cancelAnimationFrame(
                                                  s
                                              );
                                          }));
                                };
                            document.addEventListener(
                                "visibilitychange",
                                function () {
                                    l && l(), c(), f(performance.now());
                                }
                            );
                            var f = function e(t) {
                                (s = u(e)), a || (a = t);
                                var n = t - a;
                                n <= o ||
                                    ((a = t - (n % o)),
                                    i.readers.forEach(function (e) {
                                        return e();
                                    }),
                                    i.writers.forEach(function (e) {
                                        return e(t);
                                    }));
                            };
                            return (
                                c(),
                                f(performance.now()),
                                {
                                    pause: function () {
                                        l(s);
                                    },
                                }
                            );
                        },
                        q = function (e, t) {
                            return function (n) {
                                var r = n.root,
                                    i = n.props,
                                    o = n.actions,
                                    a = void 0 === o ? [] : o,
                                    s = n.timestamp,
                                    u = n.shouldOptimize;
                                a
                                    .filter(function (t) {
                                        return e[t.type];
                                    })
                                    .forEach(function (t) {
                                        return e[t.type]({
                                            root: r,
                                            props: i,
                                            action: t.data,
                                            timestamp: s,
                                            shouldOptimize: u,
                                        });
                                    }),
                                    t &&
                                        t({
                                            root: r,
                                            props: i,
                                            actions: a,
                                            timestamp: s,
                                            shouldOptimize: u,
                                        });
                            };
                        },
                        k = function (e, t) {
                            return t.parentNode.insertBefore(e, t);
                        },
                        Y = function (e, t) {
                            return t.parentNode.insertBefore(e, t.nextSibling);
                        },
                        z = function (e) {
                            return Array.isArray(e);
                        },
                        W = function (e) {
                            return null == e;
                        },
                        j = function (e) {
                            return e.trim();
                        },
                        H = function (e) {
                            return "" + e;
                        },
                        X = function (e) {
                            var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : ",";
                            return W(e)
                                ? []
                                : z(e)
                                ? e
                                : H(e)
                                      .split(t)
                                      .map(j)
                                      .filter(function (e) {
                                          return e.length;
                                      });
                        },
                        Z = function (e) {
                            return "boolean" == typeof e;
                        },
                        Q = function (e) {
                            return Z(e) ? e : "true" === e;
                        },
                        K = function (e) {
                            return "string" == typeof e;
                        },
                        $ = function (e) {
                            return T(e)
                                ? e
                                : K(e)
                                ? H(e).replace(/[a-z]+/gi, "")
                                : 0;
                        },
                        J = function (e) {
                            return parseInt($(e), 10);
                        },
                        ee = function (e) {
                            return parseFloat($(e));
                        },
                        te = function (e) {
                            return T(e) && isFinite(e) && Math.floor(e) === e;
                        },
                        ne = function (e) {
                            var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : 1e3;
                            if (te(e)) return e;
                            var n = H(e).trim();
                            return /MB$/i.test(n)
                                ? ((n = n.replace(/MB$i/, "").trim()),
                                  J(n) * t * t)
                                : /KB/i.test(n)
                                ? ((n = n.replace(/KB$i/, "").trim()), J(n) * t)
                                : J(n);
                        },
                        re = function (e) {
                            return "function" == typeof e;
                        },
                        ie = function (e) {
                            for (
                                var t = self, n = e.split("."), r = null;
                                (r = n.shift());

                            )
                                if (!(t = t[r])) return null;
                            return t;
                        },
                        oe = {
                            process: "POST",
                            patch: "PATCH",
                            revert: "DELETE",
                            fetch: "GET",
                            restore: "GET",
                            load: "GET",
                        },
                        ae = function (e) {
                            var t = {};
                            return (
                                (t.url = K(e) ? e : e.url || ""),
                                (t.timeout = e.timeout
                                    ? parseInt(e.timeout, 10)
                                    : 0),
                                (t.headers = e.headers ? e.headers : {}),
                                i(oe, function (n) {
                                    t[n] = se(
                                        n,
                                        e[n],
                                        oe[n],
                                        t.timeout,
                                        t.headers
                                    );
                                }),
                                (t.process =
                                    e.process || K(e) || e.url
                                        ? t.process
                                        : null),
                                (t.remove = e.remove || null),
                                delete t.headers,
                                t
                            );
                        },
                        se = function (e, t, n, r, i) {
                            if (null === t) return null;
                            if ("function" == typeof t) return t;
                            var o = {
                                url:
                                    "GET" === n || "PATCH" === n
                                        ? "?" + e + "="
                                        : "",
                                method: n,
                                headers: i,
                                withCredentials: !1,
                                timeout: r,
                                onload: null,
                                ondata: null,
                                onerror: null,
                            };
                            if (K(t)) return (o.url = t), o;
                            if ((Object.assign(o, t), K(o.headers))) {
                                var a = o.headers.split(/:(.+)/);
                                o.headers = { header: a[0], value: a[1] };
                            }
                            return (
                                (o.withCredentials = Q(o.withCredentials)), o
                            );
                        },
                        ue = function (e) {
                            return null === e;
                        },
                        le = function (e) {
                            return "object" == typeof e && null !== e;
                        },
                        ce = function (e) {
                            return (
                                le(e) &&
                                K(e.url) &&
                                le(e.process) &&
                                le(e.revert) &&
                                le(e.restore) &&
                                le(e.fetch)
                            );
                        },
                        fe = function (e) {
                            return z(e)
                                ? "array"
                                : ue(e)
                                ? "null"
                                : te(e)
                                ? "int"
                                : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e)
                                ? "bytes"
                                : ce(e)
                                ? "api"
                                : typeof e;
                        },
                        de = function (e) {
                            return e
                                .replace(/{\s*'/g, '{"')
                                .replace(/'\s*}/g, '"}')
                                .replace(/'\s*:/g, '":')
                                .replace(/:\s*'/g, ':"')
                                .replace(/,\s*'/g, ',"')
                                .replace(/'\s*,/g, '",');
                        },
                        pe = {
                            array: X,
                            boolean: Q,
                            int: function (e) {
                                return "bytes" === fe(e) ? ne(e) : J(e);
                            },
                            number: ee,
                            float: ee,
                            bytes: ne,
                            string: function (e) {
                                return re(e) ? e : H(e);
                            },
                            function: function (e) {
                                return ie(e);
                            },
                            serverapi: function (e) {
                                return ae(e);
                            },
                            object: function (e) {
                                try {
                                    return JSON.parse(de(e));
                                } catch (e) {
                                    return null;
                                }
                            },
                        },
                        Ee = function (e, t) {
                            return pe[t](e);
                        },
                        he = function (e, t, n) {
                            if (e === t) return e;
                            var r = fe(e);
                            if (r !== n) {
                                var i = Ee(e, n);
                                if (((r = fe(i)), null === i))
                                    throw (
                                        'Trying to assign value with incorrect type to "' +
                                        option +
                                        '", allowed type: "' +
                                        n +
                                        '"'
                                    );
                                e = i;
                            }
                            return e;
                        },
                        _e = function (e, t) {
                            var n = e;
                            return {
                                enumerable: !0,
                                get: function () {
                                    return n;
                                },
                                set: function (r) {
                                    n = he(r, e, t);
                                },
                            };
                        },
                        me = function (e) {
                            var t = {};
                            return (
                                i(e, function (n) {
                                    var r = e[n];
                                    t[n] = _e(r[0], r[1]);
                                }),
                                o(t)
                            );
                        },
                        ge = function (e) {
                            return {
                                items: [],
                                listUpdateTimeout: null,
                                itemUpdateTimeout: null,
                                processingQueue: [],
                                options: me(e),
                            };
                        },
                        Ie = function (e) {
                            var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : "-";
                            return e
                                .split(/(?=[A-Z])/)
                                .map(function (e) {
                                    return e.toLowerCase();
                                })
                                .join(t);
                        },
                        Te = function (e, t) {
                            var n = {};
                            return (
                                i(t, function (t) {
                                    n[t] = {
                                        get: function () {
                                            return e.getState().options[t];
                                        },
                                        set: function (n) {
                                            e.dispatch(
                                                "SET_" +
                                                    Ie(t, "_").toUpperCase(),
                                                { value: n }
                                            );
                                        },
                                    };
                                }),
                                n
                            );
                        },
                        ve = function (e) {
                            return function (t, n, r) {
                                var o = {};
                                return (
                                    i(e, function (e) {
                                        var n = Ie(e, "_").toUpperCase();
                                        o["SET_" + n] = function (i) {
                                            try {
                                                r.options[e] = i.value;
                                            } catch (e) {}
                                            t("DID_SET_" + n, {
                                                value: r.options[e],
                                            });
                                        };
                                    }),
                                    o
                                );
                            };
                        },
                        ye = function (e) {
                            return function (t) {
                                var n = {};
                                return (
                                    i(e, function (e) {
                                        n["GET_" + Ie(e, "_").toUpperCase()] =
                                            function (n) {
                                                return t.options[e];
                                            };
                                    }),
                                    n
                                );
                            };
                        },
                        Re = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 },
                        Oe = function () {
                            return Math.random().toString(36).substr(2, 9);
                        };
                    function Ae(e) {
                        this.wrapped = e;
                    }
                    function De(e) {
                        var t, n;
                        function r(e, r) {
                            return new Promise(function (o, a) {
                                var s = {
                                    key: e,
                                    arg: r,
                                    resolve: o,
                                    reject: a,
                                    next: null,
                                };
                                n ? (n = n.next = s) : ((t = n = s), i(e, r));
                            });
                        }
                        function i(t, n) {
                            try {
                                var r = e[t](n),
                                    a = r.value,
                                    s = a instanceof Ae;
                                Promise.resolve(s ? a.wrapped : a).then(
                                    function (e) {
                                        s
                                            ? i("next", e)
                                            : o(
                                                  r.done ? "return" : "normal",
                                                  e
                                              );
                                    },
                                    function (e) {
                                        i("throw", e);
                                    }
                                );
                            } catch (e) {
                                o("throw", e);
                            }
                        }
                        function o(e, r) {
                            switch (e) {
                                case "return":
                                    t.resolve({ value: r, done: !0 });
                                    break;
                                case "throw":
                                    t.reject(r);
                                    break;
                                default:
                                    t.resolve({ value: r, done: !1 });
                            }
                            (t = t.next) ? i(t.key, t.arg) : (n = null);
                        }
                        (this._invoke = r),
                            "function" != typeof e.return &&
                                (this.return = void 0);
                    }
                    function Se(e, t) {
                        if (null == e) return {};
                        var n,
                            r,
                            i = {},
                            o = Object.keys(e);
                        for (r = 0; r < o.length; r++)
                            (n = o[r]), t.indexOf(n) >= 0 || (i[n] = e[n]);
                        return i;
                    }
                    function we(e, t) {
                        if (null == e) return {};
                        var n,
                            r,
                            i = Se(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var o = Object.getOwnPropertySymbols(e);
                            for (r = 0; r < o.length; r++)
                                (n = o[r]),
                                    t.indexOf(n) >= 0 ||
                                        (Object.prototype.propertyIsEnumerable.call(
                                            e,
                                            n
                                        ) &&
                                            (i[n] = e[n]));
                        }
                        return i;
                    }
                    function Le(e) {
                        return Me(e) || Pe(e) || be();
                    }
                    function Me(e) {
                        if (Array.isArray(e)) {
                            for (
                                var t = 0, n = new Array(e.length);
                                t < e.length;
                                t++
                            )
                                n[t] = e[t];
                            return n;
                        }
                    }
                    function Pe(e) {
                        if (
                            Symbol.iterator in Object(e) ||
                            "[object Arguments]" ===
                                Object.prototype.toString.call(e)
                        )
                            return Array.from(e);
                    }
                    function be() {
                        throw new TypeError(
                            "Invalid attempt to spread non-iterable instance"
                        );
                    }
                    "function" == typeof Symbol &&
                        Symbol.asyncIterator &&
                        (De.prototype[Symbol.asyncIterator] = function () {
                            return this;
                        }),
                        (De.prototype.next = function (e) {
                            return this._invoke("next", e);
                        }),
                        (De.prototype.throw = function (e) {
                            return this._invoke("throw", e);
                        }),
                        (De.prototype.return = function (e) {
                            return this._invoke("return", e);
                        });
                    var Ce = function (e, t) {
                            return e.splice(t, 1);
                        },
                        Ne = function (e, t) {
                            t
                                ? e()
                                : document.hidden
                                ? Promise.resolve(1).then(e)
                                : setTimeout(e, 0);
                        },
                        Ge = function () {
                            var e = [],
                                t = function (t, n) {
                                    Ce(
                                        e,
                                        e.findIndex(function (e) {
                                            return (
                                                e.event === t &&
                                                (e.cb === n || !n)
                                            );
                                        })
                                    );
                                },
                                n = function (t, n, r) {
                                    e.filter(function (e) {
                                        return e.event === t;
                                    })
                                        .map(function (e) {
                                            return e.cb;
                                        })
                                        .forEach(function (e) {
                                            return Ne(function () {
                                                return e.apply(void 0, Le(n));
                                            }, r);
                                        });
                                };
                            return {
                                fireSync: function (e) {
                                    for (
                                        var t = arguments.length,
                                            r = new Array(t > 1 ? t - 1 : 0),
                                            i = 1;
                                        i < t;
                                        i++
                                    )
                                        r[i - 1] = arguments[i];
                                    n(e, r, !0);
                                },
                                fire: function (e) {
                                    for (
                                        var t = arguments.length,
                                            r = new Array(t > 1 ? t - 1 : 0),
                                            i = 1;
                                        i < t;
                                        i++
                                    )
                                        r[i - 1] = arguments[i];
                                    n(e, r, !1);
                                },
                                on: function (t, n) {
                                    e.push({ event: t, cb: n });
                                },
                                onOnce: function (n, r) {
                                    e.push({
                                        event: n,
                                        cb: function () {
                                            t(n, r), r.apply(void 0, arguments);
                                        },
                                    });
                                },
                                off: t,
                            };
                        },
                        xe = function (e, t, n) {
                            Object.getOwnPropertyNames(e)
                                .filter(function (e) {
                                    return !n.includes(e);
                                })
                                .forEach(function (n) {
                                    return Object.defineProperty(
                                        t,
                                        n,
                                        Object.getOwnPropertyDescriptor(e, n)
                                    );
                                });
                        },
                        Fe = [
                            "fire",
                            "process",
                            "revert",
                            "load",
                            "on",
                            "off",
                            "onOnce",
                            "retryLoad",
                            "extend",
                            "archive",
                            "archived",
                            "release",
                            "released",
                            "requestProcessing",
                            "freeze",
                        ],
                        Ue = function (e) {
                            var t = {};
                            return xe(e, t, Fe), t;
                        },
                        Be = function (e) {
                            e.forEach(function (t, n) {
                                t.released && Ce(e, n);
                            });
                        },
                        Ve = {
                            INIT: 1,
                            IDLE: 2,
                            PROCESSING_QUEUED: 9,
                            PROCESSING: 3,
                            PROCESSING_COMPLETE: 5,
                            PROCESSING_ERROR: 6,
                            PROCESSING_REVERT_ERROR: 10,
                            LOADING: 7,
                            LOAD_ERROR: 8,
                        },
                        qe = { INPUT: 1, LIMBO: 2, LOCAL: 3 },
                        ke = function (e) {
                            return /[^0-9]+/.exec(e);
                        },
                        Ye = function () {
                            return ke((1.1).toLocaleString())[0];
                        },
                        ze = function () {
                            var e = Ye(),
                                t = (1e3).toLocaleString();
                            return t !== (1e3).toString()
                                ? ke(t)[0]
                                : "." === e
                                ? ","
                                : ".";
                        },
                        We = {
                            BOOLEAN: "boolean",
                            INT: "int",
                            NUMBER: "number",
                            STRING: "string",
                            ARRAY: "array",
                            OBJECT: "object",
                            FUNCTION: "function",
                            ACTION: "action",
                            SERVER_API: "serverapi",
                            REGEX: "regex",
                        },
                        je = [],
                        He = function (e, t, n) {
                            return new Promise(function (r, i) {
                                var o = je
                                    .filter(function (t) {
                                        return t.key === e;
                                    })
                                    .map(function (e) {
                                        return e.cb;
                                    });
                                if (0 !== o.length) {
                                    var a = o.shift();
                                    o.reduce(function (e, t) {
                                        return e.then(function (e) {
                                            return t(e, n);
                                        });
                                    }, a(t, n))
                                        .then(function (e) {
                                            return r(e);
                                        })
                                        .catch(function (e) {
                                            return i(e);
                                        });
                                } else r(t);
                            });
                        },
                        Xe = function (e, t, n) {
                            return je
                                .filter(function (t) {
                                    return t.key === e;
                                })
                                .map(function (e) {
                                    return e.cb(t, n);
                                });
                        },
                        Ze = function (e, t) {
                            return je.push({ key: e, cb: t });
                        },
                        Qe = function (e) {
                            return Object.assign(Je, e);
                        },
                        Ke = function () {
                            return Object.assign({}, Je);
                        },
                        $e = function (e) {
                            i(e, function (e, t) {
                                Je[e] && (Je[e][0] = he(t, Je[e][0], Je[e][1]));
                            });
                        },
                        Je = {
                            id: [null, We.STRING],
                            name: ["filepond", We.STRING],
                            disabled: [!1, We.BOOLEAN],
                            className: [null, We.STRING],
                            required: [!1, We.BOOLEAN],
                            captureMethod: [null, We.STRING],
                            allowSyncAcceptAttribute: [!0, We.BOOLEAN],
                            allowDrop: [!0, We.BOOLEAN],
                            allowBrowse: [!0, We.BOOLEAN],
                            allowPaste: [!0, We.BOOLEAN],
                            allowMultiple: [!1, We.BOOLEAN],
                            allowReplace: [!0, We.BOOLEAN],
                            allowRevert: [!0, We.BOOLEAN],
                            allowRemove: [!0, We.BOOLEAN],
                            allowProcess: [!0, We.BOOLEAN],
                            allowReorder: [!1, We.BOOLEAN],
                            allowDirectoriesOnly: [!1, We.BOOLEAN],
                            storeAsFile: [!1, We.BOOLEAN],
                            forceRevert: [!1, We.BOOLEAN],
                            maxFiles: [null, We.INT],
                            checkValidity: [!1, We.BOOLEAN],
                            itemInsertLocationFreedom: [!0, We.BOOLEAN],
                            itemInsertLocation: ["before", We.STRING],
                            itemInsertInterval: [75, We.INT],
                            dropOnPage: [!1, We.BOOLEAN],
                            dropOnElement: [!0, We.BOOLEAN],
                            dropValidation: [!1, We.BOOLEAN],
                            ignoredFiles: [
                                [".ds_store", "thumbs.db", "desktop.ini"],
                                We.ARRAY,
                            ],
                            instantUpload: [!0, We.BOOLEAN],
                            maxParallelUploads: [2, We.INT],
                            allowMinimumUploadDuration: [!0, We.BOOLEAN],
                            chunkUploads: [!1, We.BOOLEAN],
                            chunkForce: [!1, We.BOOLEAN],
                            chunkSize: [5e6, We.INT],
                            chunkRetryDelays: [[500, 1e3, 3e3], We.ARRAY],
                            server: [null, We.SERVER_API],
                            fileSizeBase: [1e3, We.INT],
                            labelFileSizeBytes: ["bytes", We.STRING],
                            labelFileSizeKilobytes: ["KB", We.STRING],
                            labelFileSizeMegabytes: ["MB", We.STRING],
                            labelFileSizeGigabytes: ["GB", We.STRING],
                            labelDecimalSeparator: [Ye(), We.STRING],
                            labelThousandsSeparator: [ze(), We.STRING],
                            labelIdle: [
                                'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
                                We.STRING,
                            ],
                            labelInvalidField: [
                                "Field contains invalid files",
                                We.STRING,
                            ],
                            labelFileWaitingForSize: [
                                "Waiting for size",
                                We.STRING,
                            ],
                            labelFileSizeNotAvailable: [
                                "Size not available",
                                We.STRING,
                            ],
                            labelFileCountSingular: ["file in list", We.STRING],
                            labelFileCountPlural: ["files in list", We.STRING],
                            labelFileLoading: ["Loading", We.STRING],
                            labelFileAdded: ["Added", We.STRING],
                            labelFileLoadError: [
                                "Error during load",
                                We.STRING,
                            ],
                            labelFileRemoved: ["Removed", We.STRING],
                            labelFileRemoveError: [
                                "Error during remove",
                                We.STRING,
                            ],
                            labelFileProcessing: ["Uploading", We.STRING],
                            labelFileProcessingComplete: [
                                "Upload complete",
                                We.STRING,
                            ],
                            labelFileProcessingAborted: [
                                "Upload cancelled",
                                We.STRING,
                            ],
                            labelFileProcessingError: [
                                "Error during upload",
                                We.STRING,
                            ],
                            labelFileProcessingRevertError: [
                                "Error during revert",
                                We.STRING,
                            ],
                            labelTapToCancel: ["tap to cancel", We.STRING],
                            labelTapToRetry: ["tap to retry", We.STRING],
                            labelTapToUndo: ["tap to undo", We.STRING],
                            labelButtonRemoveItem: ["Remove", We.STRING],
                            labelButtonAbortItemLoad: ["Abort", We.STRING],
                            labelButtonRetryItemLoad: ["Retry", We.STRING],
                            labelButtonAbortItemProcessing: [
                                "Cancel",
                                We.STRING,
                            ],
                            labelButtonUndoItemProcessing: ["Undo", We.STRING],
                            labelButtonRetryItemProcessing: [
                                "Retry",
                                We.STRING,
                            ],
                            labelButtonProcessItem: ["Upload", We.STRING],
                            iconRemove: [
                                '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
                                We.STRING,
                            ],
                            iconProcess: [
                                '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
                                We.STRING,
                            ],
                            iconRetry: [
                                '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
                                We.STRING,
                            ],
                            iconUndo: [
                                '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
                                We.STRING,
                            ],
                            iconDone: [
                                '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
                                We.STRING,
                            ],
                            oninit: [null, We.FUNCTION],
                            onwarning: [null, We.FUNCTION],
                            onerror: [null, We.FUNCTION],
                            onactivatefile: [null, We.FUNCTION],
                            oninitfile: [null, We.FUNCTION],
                            onaddfilestart: [null, We.FUNCTION],
                            onaddfileprogress: [null, We.FUNCTION],
                            onaddfile: [null, We.FUNCTION],
                            onprocessfilestart: [null, We.FUNCTION],
                            onprocessfileprogress: [null, We.FUNCTION],
                            onprocessfileabort: [null, We.FUNCTION],
                            onprocessfilerevert: [null, We.FUNCTION],
                            onprocessfile: [null, We.FUNCTION],
                            onprocessfiles: [null, We.FUNCTION],
                            onremovefile: [null, We.FUNCTION],
                            onpreparefile: [null, We.FUNCTION],
                            onupdatefiles: [null, We.FUNCTION],
                            onreorderfiles: [null, We.FUNCTION],
                            beforeDropFile: [null, We.FUNCTION],
                            beforeAddFile: [null, We.FUNCTION],
                            beforeRemoveFile: [null, We.FUNCTION],
                            beforePrepareFile: [null, We.FUNCTION],
                            stylePanelLayout: [null, We.STRING],
                            stylePanelAspectRatio: [null, We.STRING],
                            styleItemPanelAspectRatio: [null, We.STRING],
                            styleButtonRemoveItemPosition: ["left", We.STRING],
                            styleButtonProcessItemPosition: [
                                "right",
                                We.STRING,
                            ],
                            styleLoadIndicatorPosition: ["right", We.STRING],
                            styleProgressIndicatorPosition: [
                                "right",
                                We.STRING,
                            ],
                            styleButtonRemoveItemAlign: [!1, We.BOOLEAN],
                            files: [[], We.ARRAY],
                            credits: [
                                ["https://pqina.nl/", "Powered by PQINA"],
                                We.ARRAY,
                            ],
                        },
                        et = function (e, t) {
                            return W(t)
                                ? e[0] || null
                                : te(t)
                                ? e[t] || null
                                : ("object" == typeof t && (t = t.id),
                                  e.find(function (e) {
                                      return e.id === t;
                                  }) || null);
                        },
                        tt = function (e) {
                            if (W(e)) return e;
                            if (/:/.test(e)) {
                                var t = e.split(":");
                                return t[1] / t[0];
                            }
                            return parseFloat(e);
                        },
                        nt = function (e) {
                            return e.filter(function (e) {
                                return !e.archived;
                            });
                        },
                        rt = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 },
                        it = null,
                        ot = function () {
                            if (null === it)
                                try {
                                    var e = new DataTransfer();
                                    e.items.add(
                                        new File(
                                            ["hello world"],
                                            "This_Works.txt"
                                        )
                                    );
                                    var t = document.createElement("input");
                                    t.setAttribute("type", "file"),
                                        (t.files = e.files),
                                        (it = 1 === t.files.length);
                                } catch (e) {
                                    it = !1;
                                }
                            return it;
                        },
                        at = [
                            Ve.LOAD_ERROR,
                            Ve.PROCESSING_ERROR,
                            Ve.PROCESSING_REVERT_ERROR,
                        ],
                        st = [
                            Ve.LOADING,
                            Ve.PROCESSING,
                            Ve.PROCESSING_QUEUED,
                            Ve.INIT,
                        ],
                        ut = [Ve.PROCESSING_COMPLETE],
                        lt = function (e) {
                            return at.includes(e.status);
                        },
                        ct = function (e) {
                            return st.includes(e.status);
                        },
                        ft = function (e) {
                            return ut.includes(e.status);
                        },
                        dt = function (e) {
                            return (
                                le(e.options.server) &&
                                (le(e.options.server.process) ||
                                    re(e.options.server.process))
                            );
                        },
                        pt = function (e) {
                            return {
                                GET_STATUS: function () {
                                    var t = nt(e.items),
                                        n = rt.EMPTY,
                                        r = rt.ERROR,
                                        i = rt.BUSY,
                                        o = rt.IDLE,
                                        a = rt.READY;
                                    return 0 === t.length
                                        ? n
                                        : t.some(lt)
                                        ? r
                                        : t.some(ct)
                                        ? i
                                        : t.some(ft)
                                        ? a
                                        : o;
                                },
                                GET_ITEM: function (t) {
                                    return et(e.items, t);
                                },
                                GET_ACTIVE_ITEM: function (t) {
                                    return et(nt(e.items), t);
                                },
                                GET_ACTIVE_ITEMS: function () {
                                    return nt(e.items);
                                },
                                GET_ITEMS: function () {
                                    return e.items;
                                },
                                GET_ITEM_NAME: function (t) {
                                    var n = et(e.items, t);
                                    return n ? n.filename : null;
                                },
                                GET_ITEM_SIZE: function (t) {
                                    var n = et(e.items, t);
                                    return n ? n.fileSize : null;
                                },
                                GET_STYLES: function () {
                                    return Object.keys(e.options)
                                        .filter(function (e) {
                                            return /^style/.test(e);
                                        })
                                        .map(function (t) {
                                            return {
                                                name: t,
                                                value: e.options[t],
                                            };
                                        });
                                },
                                GET_PANEL_ASPECT_RATIO: function () {
                                    return /circle/.test(
                                        e.options.stylePanelLayout
                                    )
                                        ? 1
                                        : tt(e.options.stylePanelAspectRatio);
                                },
                                GET_ITEM_PANEL_ASPECT_RATIO: function () {
                                    return e.options.styleItemPanelAspectRatio;
                                },
                                GET_ITEMS_BY_STATUS: function (t) {
                                    return nt(e.items).filter(function (e) {
                                        return e.status === t;
                                    });
                                },
                                GET_TOTAL_ITEMS: function () {
                                    return nt(e.items).length;
                                },
                                SHOULD_UPDATE_FILE_INPUT: function () {
                                    return (
                                        e.options.storeAsFile && ot() && !dt(e)
                                    );
                                },
                                IS_ASYNC: function () {
                                    return dt(e);
                                },
                                GET_FILE_SIZE_LABELS: function (e) {
                                    return {
                                        labelBytes:
                                            e("GET_LABEL_FILE_SIZE_BYTES") ||
                                            void 0,
                                        labelKilobytes:
                                            e(
                                                "GET_LABEL_FILE_SIZE_KILOBYTES"
                                            ) || void 0,
                                        labelMegabytes:
                                            e(
                                                "GET_LABEL_FILE_SIZE_MEGABYTES"
                                            ) || void 0,
                                        labelGigabytes:
                                            e(
                                                "GET_LABEL_FILE_SIZE_GIGABYTES"
                                            ) || void 0,
                                    };
                                },
                            };
                        },
                        Et = function (e) {
                            var t = nt(e.items).length;
                            if (!e.options.allowMultiple) return 0 === t;
                            var n = e.options.maxFiles;
                            return null === n || t < n;
                        },
                        ht = function (e, t, n) {
                            return Math.max(Math.min(n, e), t);
                        },
                        _t = function (e, t, n) {
                            return e.splice(t, 0, n);
                        },
                        mt = function (e, t, n) {
                            return W(t)
                                ? null
                                : void 0 === n
                                ? (e.push(t), t)
                                : ((n = ht(n, 0, e.length)), _t(e, n, t), t);
                        },
                        gt = function (e) {
                            return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
                                e
                            );
                        },
                        It = function (e) {
                            return e.split("/").pop().split("?").shift();
                        },
                        Tt = function (e) {
                            return e.split(".").pop();
                        },
                        vt = function (e) {
                            if ("string" != typeof e) return "";
                            var t = e.split("/").pop();
                            return /svg/.test(t)
                                ? "svg"
                                : /zip|compressed/.test(t)
                                ? "zip"
                                : /plain/.test(t)
                                ? "txt"
                                : /msword/.test(t)
                                ? "doc"
                                : /[a-z]+/.test(t)
                                ? "jpeg" === t
                                    ? "jpg"
                                    : t
                                : "";
                        },
                        yt = function (e) {
                            var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : "";
                            return (t + e).slice(-t.length);
                        },
                        Rt = function () {
                            var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : new Date();
                            return (
                                e.getFullYear() +
                                "-" +
                                yt(e.getMonth() + 1, "00") +
                                "-" +
                                yt(e.getDate(), "00") +
                                "_" +
                                yt(e.getHours(), "00") +
                                "-" +
                                yt(e.getMinutes(), "00") +
                                "-" +
                                yt(e.getSeconds(), "00")
                            );
                        },
                        Ot = function (e, t) {
                            var n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : null,
                                r =
                                    arguments.length > 3 &&
                                    void 0 !== arguments[3]
                                        ? arguments[3]
                                        : null,
                                i =
                                    "string" == typeof n
                                        ? e.slice(0, e.size, n)
                                        : e.slice(0, e.size, e.type);
                            return (
                                (i.lastModifiedDate = new Date()),
                                e._relativePath &&
                                    (i._relativePath = e._relativePath),
                                K(t) || (t = Rt()),
                                t && null === r && Tt(t)
                                    ? (i.name = t)
                                    : ((r = r || vt(i.type)),
                                      (i.name = t + (r ? "." + r : ""))),
                                i
                            );
                        },
                        At = function () {
                            return (window.BlobBuilder =
                                window.BlobBuilder ||
                                window.WebKitBlobBuilder ||
                                window.MozBlobBuilder ||
                                window.MSBlobBuilder);
                        },
                        Dt = function (e, t) {
                            var n = At();
                            if (n) {
                                var r = new n();
                                return r.append(e), r.getBlob(t);
                            }
                            return new Blob([e], { type: t });
                        },
                        St = function (e, t) {
                            for (
                                var n = new ArrayBuffer(e.length),
                                    r = new Uint8Array(n),
                                    i = 0;
                                i < e.length;
                                i++
                            )
                                r[i] = e.charCodeAt(i);
                            return Dt(n, t);
                        },
                        wt = function (e) {
                            return (/^data:(.+);/.exec(e) || [])[1] || null;
                        },
                        Lt = function (e) {
                            return e.split(",")[1].replace(/\s/g, "");
                        },
                        Mt = function (e) {
                            return atob(Lt(e));
                        },
                        Pt = function (e) {
                            var t = wt(e),
                                n = Mt(e);
                            return St(n, t);
                        },
                        bt = function (e, t, n) {
                            return Ot(Pt(e), t, null, n);
                        },
                        Ct = function (e) {
                            if (!/^content-disposition:/i.test(e)) return null;
                            var t = e
                                .split(/filename=|filename\*=.+''/)
                                .splice(1)
                                .map(function (e) {
                                    return e
                                        .trim()
                                        .replace(/^["']|[;"']{0,2}$/g, "");
                                })
                                .filter(function (e) {
                                    return e.length;
                                });
                            return t.length ? decodeURI(t[t.length - 1]) : null;
                        },
                        Nt = function (e) {
                            if (/content-length:/i.test(e)) {
                                var t = e.match(/[0-9]+/)[0];
                                return t ? parseInt(t, 10) : null;
                            }
                            return null;
                        },
                        Gt = function (e) {
                            return (
                                (/x-content-transfer-id:/i.test(e) &&
                                    (e.split(":")[1] || "").trim()) ||
                                null
                            );
                        },
                        xt = function (e) {
                            var t = { source: null, name: null, size: null },
                                n = e.split("\n"),
                                r = !0,
                                i = !1,
                                o = void 0;
                            try {
                                for (
                                    var a, s = n[Symbol.iterator]();
                                    !(r = (a = s.next()).done);
                                    r = !0
                                ) {
                                    var u = a.value,
                                        l = Ct(u);
                                    if (l) t.name = l;
                                    else {
                                        var c = Nt(u);
                                        if (c) t.size = c;
                                        else {
                                            var f = Gt(u);
                                            f && (t.source = f);
                                        }
                                    }
                                }
                            } catch (e) {
                                (i = !0), (o = e);
                            } finally {
                                try {
                                    r || null == s.return || s.return();
                                } finally {
                                    if (i) throw o;
                                }
                            }
                            return t;
                        },
                        Ft = function (e) {
                            var t = {
                                    source: null,
                                    complete: !1,
                                    progress: 0,
                                    size: null,
                                    timestamp: null,
                                    duration: 0,
                                    request: null,
                                },
                                n = function () {
                                    return t.progress;
                                },
                                r = function () {
                                    t.request &&
                                        t.request.abort &&
                                        t.request.abort();
                                },
                                i = function () {
                                    var e = t.source;
                                    a.fire("init", e),
                                        e instanceof File
                                            ? a.fire("load", e)
                                            : e instanceof Blob
                                            ? a.fire("load", Ot(e, e.name))
                                            : gt(e)
                                            ? a.fire("load", bt(e))
                                            : o(e);
                                },
                                o = function (n) {
                                    e
                                        ? ((t.timestamp = Date.now()),
                                          (t.request = e(
                                              n,
                                              function (e) {
                                                  (t.duration =
                                                      Date.now() - t.timestamp),
                                                      (t.complete = !0),
                                                      e instanceof Blob &&
                                                          (e = Ot(
                                                              e,
                                                              e.name || It(n)
                                                          )),
                                                      a.fire(
                                                          "load",
                                                          e instanceof Blob
                                                              ? e
                                                              : e
                                                              ? e.body
                                                              : null
                                                      );
                                              },
                                              function (e) {
                                                  a.fire(
                                                      "error",
                                                      "string" == typeof e
                                                          ? {
                                                                type: "error",
                                                                code: 0,
                                                                body: e,
                                                            }
                                                          : e
                                                  );
                                              },
                                              function (e, n, r) {
                                                  r && (t.size = r),
                                                      (t.duration =
                                                          Date.now() -
                                                          t.timestamp),
                                                      e
                                                          ? ((t.progress =
                                                                n / r),
                                                            a.fire(
                                                                "progress",
                                                                t.progress
                                                            ))
                                                          : (t.progress = null);
                                              },
                                              function () {
                                                  a.fire("abort");
                                              },
                                              function (e) {
                                                  var n = xt(
                                                      "string" == typeof e
                                                          ? e
                                                          : e.headers
                                                  );
                                                  a.fire("meta", {
                                                      size: t.size || n.size,
                                                      filename: n.name,
                                                      source: n.source,
                                                  });
                                              }
                                          )))
                                        : a.fire("error", {
                                              type: "error",
                                              body: "Can't load URL",
                                              code: 400,
                                          });
                                },
                                a = Object.assign({}, Ge(), {
                                    setSource: function (e) {
                                        return (t.source = e);
                                    },
                                    getProgress: n,
                                    abort: r,
                                    load: i,
                                });
                            return a;
                        },
                        Ut = function (e) {
                            return /GET|HEAD/.test(e);
                        },
                        Bt = function (e, t, n) {
                            var r = {
                                    onheaders: function () {},
                                    onprogress: function () {},
                                    onload: function () {},
                                    ontimeout: function () {},
                                    onerror: function () {},
                                    onabort: function () {},
                                    abort: function () {
                                        (i = !0), a.abort();
                                    },
                                },
                                i = !1,
                                o = !1;
                            (n = Object.assign(
                                {
                                    method: "POST",
                                    headers: {},
                                    withCredentials: !1,
                                },
                                n
                            )),
                                (t = encodeURI(t)),
                                Ut(n.method) &&
                                    e &&
                                    (t =
                                        "" +
                                        t +
                                        encodeURIComponent(
                                            "string" == typeof e
                                                ? e
                                                : JSON.stringify(e)
                                        ));
                            var a = new XMLHttpRequest();
                            return (
                                ((Ut(n.method) ? a : a.upload).onprogress =
                                    function (e) {
                                        i ||
                                            r.onprogress(
                                                e.lengthComputable,
                                                e.loaded,
                                                e.total
                                            );
                                    }),
                                (a.onreadystatechange = function () {
                                    a.readyState < 2 ||
                                        (4 === a.readyState &&
                                            0 === a.status) ||
                                        o ||
                                        ((o = !0), r.onheaders(a));
                                }),
                                (a.onload = function () {
                                    a.status >= 200 && a.status < 300
                                        ? r.onload(a)
                                        : r.onerror(a);
                                }),
                                (a.onerror = function () {
                                    return r.onerror(a);
                                }),
                                (a.onabort = function () {
                                    (i = !0), r.onabort();
                                }),
                                (a.ontimeout = function () {
                                    return r.ontimeout(a);
                                }),
                                a.open(n.method, t, !0),
                                te(n.timeout) && (a.timeout = n.timeout),
                                Object.keys(n.headers).forEach(function (e) {
                                    var t = unescape(
                                        encodeURIComponent(n.headers[e])
                                    );
                                    a.setRequestHeader(e, t);
                                }),
                                n.responseType &&
                                    (a.responseType = n.responseType),
                                n.withCredentials && (a.withCredentials = !0),
                                a.send(e),
                                r
                            );
                        },
                        Vt = function (e, t, n, r) {
                            return { type: e, code: t, body: n, headers: r };
                        },
                        qt = function (e) {
                            return function (t) {
                                e(
                                    Vt(
                                        "error",
                                        0,
                                        "Timeout",
                                        t.getAllResponseHeaders()
                                    )
                                );
                            };
                        },
                        kt = function (e) {
                            return /\?/.test(e);
                        },
                        Yt = function () {
                            for (
                                var e = "",
                                    t = arguments.length,
                                    n = new Array(t),
                                    r = 0;
                                r < t;
                                r++
                            )
                                n[r] = arguments[r];
                            return (
                                n.forEach(function (t) {
                                    e +=
                                        kt(e) && kt(t)
                                            ? t.replace(/\?/, "&")
                                            : t;
                                }),
                                e
                            );
                        },
                        zt = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : "",
                                t =
                                    arguments.length > 1
                                        ? arguments[1]
                                        : void 0;
                            if ("function" == typeof t) return t;
                            if (!t || !K(t.url)) return null;
                            var n =
                                    t.onload ||
                                    function (e) {
                                        return e;
                                    },
                                r =
                                    t.onerror ||
                                    function (e) {
                                        return null;
                                    };
                            return function (i, o, a, s, u, l) {
                                var c = Bt(
                                    i,
                                    Yt(e, t.url),
                                    Object.assign({}, t, {
                                        responseType: "blob",
                                    })
                                );
                                return (
                                    (c.onload = function (e) {
                                        var r = e.getAllResponseHeaders(),
                                            a = xt(r).name || It(i);
                                        o(
                                            Vt(
                                                "load",
                                                e.status,
                                                "HEAD" === t.method
                                                    ? null
                                                    : Ot(n(e.response), a),
                                                r
                                            )
                                        );
                                    }),
                                    (c.onerror = function (e) {
                                        a(
                                            Vt(
                                                "error",
                                                e.status,
                                                r(e.response) || e.statusText,
                                                e.getAllResponseHeaders()
                                            )
                                        );
                                    }),
                                    (c.onheaders = function (e) {
                                        l(
                                            Vt(
                                                "headers",
                                                e.status,
                                                null,
                                                e.getAllResponseHeaders()
                                            )
                                        );
                                    }),
                                    (c.ontimeout = qt(a)),
                                    (c.onprogress = s),
                                    (c.onabort = u),
                                    c
                                );
                            };
                        },
                        Wt = {
                            QUEUED: 0,
                            COMPLETE: 1,
                            PROCESSING: 2,
                            ERROR: 3,
                            WAITING: 4,
                        },
                        jt = function (e, t, n, r, i, o, a, s, u, l, c) {
                            for (
                                var f = [],
                                    d = c.chunkTransferId,
                                    p = c.chunkServer,
                                    E = c.chunkSize,
                                    h = c.chunkRetryDelays,
                                    _ = { serverId: d, aborted: !1 },
                                    m =
                                        t.ondata ||
                                        function (e) {
                                            return e;
                                        },
                                    g =
                                        t.onload ||
                                        function (e, t) {
                                            return "HEAD" === t
                                                ? e.getResponseHeader(
                                                      "Upload-Offset"
                                                  )
                                                : e.response;
                                        },
                                    I =
                                        t.onerror ||
                                        function (e) {
                                            return null;
                                        },
                                    T = function (o) {
                                        var s = new FormData();
                                        le(i) && s.append(n, JSON.stringify(i));
                                        var u =
                                                "function" == typeof t.headers
                                                    ? t.headers(r, i)
                                                    : Object.assign(
                                                          {},
                                                          t.headers,
                                                          {
                                                              "Upload-Length":
                                                                  r.size,
                                                          }
                                                      ),
                                            l = Object.assign({}, t, {
                                                headers: u,
                                            }),
                                            c = Bt(m(s), Yt(e, t.url), l);
                                        (c.onload = function (e) {
                                            return o(g(e, l.method));
                                        }),
                                            (c.onerror = function (e) {
                                                return a(
                                                    Vt(
                                                        "error",
                                                        e.status,
                                                        I(e.response) ||
                                                            e.statusText,
                                                        e.getAllResponseHeaders()
                                                    )
                                                );
                                            }),
                                            (c.ontimeout = qt(a));
                                    },
                                    v = function (n) {
                                        var r = Yt(e, p.url, _.serverId),
                                            i = {
                                                headers:
                                                    "function" ==
                                                    typeof t.headers
                                                        ? t.headers(_.serverId)
                                                        : Object.assign(
                                                              {},
                                                              t.headers
                                                          ),
                                                method: "HEAD",
                                            },
                                            o = Bt(null, r, i);
                                        (o.onload = function (e) {
                                            return n(g(e, i.method));
                                        }),
                                            (o.onerror = function (e) {
                                                return a(
                                                    Vt(
                                                        "error",
                                                        e.status,
                                                        I(e.response) ||
                                                            e.statusText,
                                                        e.getAllResponseHeaders()
                                                    )
                                                );
                                            }),
                                            (o.ontimeout = qt(a));
                                    },
                                    y = Math.floor(r.size / E),
                                    R = 0;
                                R <= y;
                                R++
                            ) {
                                var O = R * E,
                                    A = r.slice(
                                        O,
                                        O + E,
                                        "application/offset+octet-stream"
                                    );
                                f[R] = {
                                    index: R,
                                    size: A.size,
                                    offset: O,
                                    data: A,
                                    file: r,
                                    progress: 0,
                                    retries: Le(h),
                                    status: Wt.QUEUED,
                                    error: null,
                                    request: null,
                                    timeout: null,
                                };
                            }
                            var D = function () {
                                    return o(_.serverId);
                                },
                                S = function (e) {
                                    return (
                                        e.status === Wt.QUEUED ||
                                        e.status === Wt.ERROR
                                    );
                                },
                                w = function (t) {
                                    if (!_.aborted)
                                        if ((t = t || f.find(S))) {
                                            (t.status = Wt.PROCESSING),
                                                (t.progress = null);
                                            var n =
                                                    p.ondata ||
                                                    function (e) {
                                                        return e;
                                                    },
                                                i =
                                                    p.onerror ||
                                                    function (e) {
                                                        return null;
                                                    },
                                                o = Yt(e, p.url, _.serverId),
                                                s =
                                                    "function" ==
                                                    typeof p.headers
                                                        ? p.headers(t)
                                                        : Object.assign(
                                                              {},
                                                              p.headers,
                                                              {
                                                                  "Content-Type":
                                                                      "application/offset+octet-stream",
                                                                  "Upload-Offset":
                                                                      t.offset,
                                                                  "Upload-Length":
                                                                      r.size,
                                                                  "Upload-Name":
                                                                      r.name,
                                                              }
                                                          ),
                                                l = (t.request = Bt(
                                                    n(t.data),
                                                    o,
                                                    Object.assign({}, p, {
                                                        headers: s,
                                                    })
                                                ));
                                            (l.onload = function () {
                                                (t.status = Wt.COMPLETE),
                                                    (t.request = null),
                                                    P();
                                            }),
                                                (l.onprogress = function (
                                                    e,
                                                    n,
                                                    r
                                                ) {
                                                    (t.progress = e ? n : null),
                                                        M();
                                                }),
                                                (l.onerror = function (e) {
                                                    (t.status = Wt.ERROR),
                                                        (t.request = null),
                                                        (t.error =
                                                            i(e.response) ||
                                                            e.statusText),
                                                        L(t) ||
                                                            a(
                                                                Vt(
                                                                    "error",
                                                                    e.status,
                                                                    i(
                                                                        e.response
                                                                    ) ||
                                                                        e.statusText,
                                                                    e.getAllResponseHeaders()
                                                                )
                                                            );
                                                }),
                                                (l.ontimeout = function (e) {
                                                    (t.status = Wt.ERROR),
                                                        (t.request = null),
                                                        L(t) || qt(a)(e);
                                                }),
                                                (l.onabort = function () {
                                                    (t.status = Wt.QUEUED),
                                                        (t.request = null),
                                                        u();
                                                });
                                        } else
                                            f.every(function (e) {
                                                return e.status === Wt.COMPLETE;
                                            }) && D();
                                },
                                L = function (e) {
                                    return (
                                        0 !== e.retries.length &&
                                        ((e.status = Wt.WAITING),
                                        clearTimeout(e.timeout),
                                        (e.timeout = setTimeout(function () {
                                            w(e);
                                        }, e.retries.shift())),
                                        !0)
                                    );
                                },
                                M = function () {
                                    var e = f.reduce(function (e, t) {
                                        return null === e || null === t.progress
                                            ? null
                                            : e + t.progress;
                                    }, 0);
                                    if (null === e) return s(!1, 0, 0);
                                    var t = f.reduce(function (e, t) {
                                        return e + t.size;
                                    }, 0);
                                    s(!0, e, t);
                                },
                                P = function () {
                                    f.filter(function (e) {
                                        return e.status === Wt.PROCESSING;
                                    }).length >= 1 || w();
                                },
                                b = function () {
                                    f.forEach(function (e) {
                                        clearTimeout(e.timeout),
                                            e.request && e.request.abort();
                                    });
                                };
                            return (
                                _.serverId
                                    ? v(function (e) {
                                          _.aborted ||
                                              (f
                                                  .filter(function (t) {
                                                      return t.offset < e;
                                                  })
                                                  .forEach(function (e) {
                                                      (e.status = Wt.COMPLETE),
                                                          (e.progress = e.size);
                                                  }),
                                              P());
                                      })
                                    : T(function (e) {
                                          _.aborted ||
                                              (l(e), (_.serverId = e), P());
                                      }),
                                {
                                    abort: function () {
                                        (_.aborted = !0), b();
                                    },
                                }
                            );
                        },
                        Ht = function (e, t, n, r) {
                            return function (i, o, a, s, u, l, c) {
                                if (i) {
                                    var f = r.chunkUploads,
                                        d = f && i.size > r.chunkSize,
                                        p = f && (d || r.chunkForce);
                                    if (i instanceof Blob && p)
                                        return jt(
                                            e,
                                            t,
                                            n,
                                            i,
                                            o,
                                            a,
                                            s,
                                            u,
                                            l,
                                            c,
                                            r
                                        );
                                    var E =
                                            t.ondata ||
                                            function (e) {
                                                return e;
                                            },
                                        h =
                                            t.onload ||
                                            function (e) {
                                                return e;
                                            },
                                        _ =
                                            t.onerror ||
                                            function (e) {
                                                return null;
                                            },
                                        m =
                                            "function" == typeof t.headers
                                                ? t.headers(i, o) || {}
                                                : Object.assign({}, t.headers),
                                        g = Object.assign({}, t, {
                                            headers: m,
                                        }),
                                        I = new FormData();
                                    le(o) && I.append(n, JSON.stringify(o)),
                                        (i instanceof Blob
                                            ? [{ name: null, file: i }]
                                            : i
                                        ).forEach(function (e) {
                                            I.append(
                                                n,
                                                e.file,
                                                null === e.name
                                                    ? e.file.name
                                                    : "" + e.name + e.file.name
                                            );
                                        });
                                    var T = Bt(E(I), Yt(e, t.url), g);
                                    return (
                                        (T.onload = function (e) {
                                            a(
                                                Vt(
                                                    "load",
                                                    e.status,
                                                    h(e.response),
                                                    e.getAllResponseHeaders()
                                                )
                                            );
                                        }),
                                        (T.onerror = function (e) {
                                            s(
                                                Vt(
                                                    "error",
                                                    e.status,
                                                    _(e.response) ||
                                                        e.statusText,
                                                    e.getAllResponseHeaders()
                                                )
                                            );
                                        }),
                                        (T.ontimeout = qt(s)),
                                        (T.onprogress = u),
                                        (T.onabort = l),
                                        T
                                    );
                                }
                            };
                        },
                        Xt = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : "",
                                t =
                                    arguments.length > 1
                                        ? arguments[1]
                                        : void 0,
                                n =
                                    arguments.length > 2
                                        ? arguments[2]
                                        : void 0,
                                r =
                                    arguments.length > 3
                                        ? arguments[3]
                                        : void 0;
                            return "function" == typeof t
                                ? function () {
                                      for (
                                          var e = arguments.length,
                                              i = new Array(e),
                                              o = 0;
                                          o < e;
                                          o++
                                      )
                                          i[o] = arguments[o];
                                      return t.apply(
                                          void 0,
                                          [n].concat(i, [r])
                                      );
                                  }
                                : t && K(t.url)
                                ? Ht(e, t, n, r)
                                : null;
                        },
                        Zt = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : "",
                                t =
                                    arguments.length > 1
                                        ? arguments[1]
                                        : void 0;
                            if ("function" == typeof t) return t;
                            if (!t || !K(t.url))
                                return function (e, t) {
                                    return t();
                                };
                            var n =
                                    t.onload ||
                                    function (e) {
                                        return e;
                                    },
                                r =
                                    t.onerror ||
                                    function (e) {
                                        return null;
                                    };
                            return function (i, o, a) {
                                var s = Bt(i, e + t.url, t);
                                return (
                                    (s.onload = function (e) {
                                        o(
                                            Vt(
                                                "load",
                                                e.status,
                                                n(e.response),
                                                e.getAllResponseHeaders()
                                            )
                                        );
                                    }),
                                    (s.onerror = function (e) {
                                        a(
                                            Vt(
                                                "error",
                                                e.status,
                                                r(e.response) || e.statusText,
                                                e.getAllResponseHeaders()
                                            )
                                        );
                                    }),
                                    (s.ontimeout = qt(a)),
                                    s
                                );
                            };
                        },
                        Qt = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : 0,
                                t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 1;
                            return e + Math.random() * (t - e);
                        },
                        Kt = function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 1e3,
                                n =
                                    arguments.length > 3 &&
                                    void 0 !== arguments[3]
                                        ? arguments[3]
                                        : 25,
                                r =
                                    arguments.length > 4 &&
                                    void 0 !== arguments[4]
                                        ? arguments[4]
                                        : 250,
                                i = null,
                                o = Date.now();
                            return (
                                t > 0 &&
                                    (function a() {
                                        var s = Date.now() - o,
                                            u = Qt(n, r);
                                        s + u > t && (u = s + u - t);
                                        var l = s / t;
                                        l >= 1 || document.hidden
                                            ? e(1)
                                            : (e(l), (i = setTimeout(a, u)));
                                    })(),
                                {
                                    clear: function () {
                                        clearTimeout(i);
                                    },
                                }
                            );
                        },
                        $t = function (e, t) {
                            var n = {
                                    complete: !1,
                                    perceivedProgress: 0,
                                    perceivedPerformanceUpdater: null,
                                    progress: null,
                                    timestamp: null,
                                    perceivedDuration: 0,
                                    duration: 0,
                                    request: null,
                                    response: null,
                                },
                                r = t.allowMinimumUploadDuration,
                                i = function (t, i) {
                                    var o = function () {
                                            0 !== n.duration &&
                                                null !== n.progress &&
                                                l.fire(
                                                    "progress",
                                                    l.getProgress()
                                                );
                                        },
                                        a = function () {
                                            (n.complete = !0),
                                                l.fire(
                                                    "load-perceived",
                                                    n.response.body
                                                );
                                        };
                                    l.fire("start"),
                                        (n.timestamp = Date.now()),
                                        (n.perceivedPerformanceUpdater = Kt(
                                            function (e) {
                                                (n.perceivedProgress = e),
                                                    (n.perceivedDuration =
                                                        Date.now() -
                                                        n.timestamp),
                                                    o(),
                                                    n.response &&
                                                        1 ===
                                                            n.perceivedProgress &&
                                                        !n.complete &&
                                                        a();
                                            },
                                            r ? Qt(750, 1500) : 0
                                        )),
                                        (n.request = e(
                                            t,
                                            i,
                                            function (e) {
                                                (n.response = le(e)
                                                    ? e
                                                    : {
                                                          type: "load",
                                                          code: 200,
                                                          body: "" + e,
                                                          headers: {},
                                                      }),
                                                    (n.duration =
                                                        Date.now() -
                                                        n.timestamp),
                                                    (n.progress = 1),
                                                    l.fire(
                                                        "load",
                                                        n.response.body
                                                    ),
                                                    (!r ||
                                                        (r &&
                                                            1 ===
                                                                n.perceivedProgress)) &&
                                                        a();
                                            },
                                            function (e) {
                                                n.perceivedPerformanceUpdater.clear(),
                                                    l.fire(
                                                        "error",
                                                        le(e)
                                                            ? e
                                                            : {
                                                                  type: "error",
                                                                  code: 0,
                                                                  body: "" + e,
                                                              }
                                                    );
                                            },
                                            function (e, t, r) {
                                                (n.duration =
                                                    Date.now() - n.timestamp),
                                                    (n.progress = e
                                                        ? t / r
                                                        : null),
                                                    o();
                                            },
                                            function () {
                                                n.perceivedPerformanceUpdater.clear(),
                                                    l.fire(
                                                        "abort",
                                                        n.response
                                                            ? n.response.body
                                                            : null
                                                    );
                                            },
                                            function (e) {
                                                l.fire("transfer", e);
                                            }
                                        ));
                                },
                                o = function () {
                                    n.request &&
                                        (n.perceivedPerformanceUpdater.clear(),
                                        n.request.abort && n.request.abort(),
                                        (n.complete = !0));
                                },
                                a = function () {
                                    o(),
                                        (n.complete = !1),
                                        (n.perceivedProgress = 0),
                                        (n.progress = 0),
                                        (n.timestamp = null),
                                        (n.perceivedDuration = 0),
                                        (n.duration = 0),
                                        (n.request = null),
                                        (n.response = null);
                                },
                                s = r
                                    ? function () {
                                          return n.progress
                                              ? Math.min(
                                                    n.progress,
                                                    n.perceivedProgress
                                                )
                                              : null;
                                      }
                                    : function () {
                                          return n.progress || null;
                                      },
                                u = r
                                    ? function () {
                                          return Math.min(
                                              n.duration,
                                              n.perceivedDuration
                                          );
                                      }
                                    : function () {
                                          return n.duration;
                                      },
                                l = Object.assign({}, Ge(), {
                                    process: i,
                                    abort: o,
                                    getProgress: s,
                                    getDuration: u,
                                    reset: a,
                                });
                            return l;
                        },
                        Jt = function (e) {
                            return e.substr(0, e.lastIndexOf(".")) || e;
                        },
                        en = function (e) {
                            var t = [e.name, e.size, e.type];
                            return (
                                e instanceof Blob || gt(e)
                                    ? (t[0] = e.name || Rt())
                                    : gt(e)
                                    ? ((t[1] = e.length), (t[2] = wt(e)))
                                    : K(e) &&
                                      ((t[0] = It(e)),
                                      (t[1] = 0),
                                      (t[2] = "application/octet-stream")),
                                { name: t[0], size: t[1], type: t[2] }
                            );
                        },
                        tn = function (e) {
                            return !!(
                                e instanceof File ||
                                (e instanceof Blob && e.name)
                            );
                        },
                        nn = function e(t) {
                            if (!le(t)) return t;
                            var n = z(t) ? [] : {};
                            for (var r in t)
                                if (t.hasOwnProperty(r)) {
                                    var i = t[r];
                                    n[r] = i && le(i) ? e(i) : i;
                                }
                            return n;
                        },
                        rn = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : null,
                                t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null,
                                n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : null,
                                r = Oe(),
                                i = {
                                    archived: !1,
                                    frozen: !1,
                                    released: !1,
                                    source: null,
                                    file: n,
                                    serverFileReference: t,
                                    transferId: null,
                                    processingAborted: !1,
                                    status: t
                                        ? Ve.PROCESSING_COMPLETE
                                        : Ve.INIT,
                                    activeLoader: null,
                                    activeProcessor: null,
                                },
                                a = null,
                                s = {},
                                u = function (e) {
                                    return (i.status = e);
                                },
                                l = function (e) {
                                    if (!i.released && !i.frozen) {
                                        for (
                                            var t = arguments.length,
                                                n = new Array(
                                                    t > 1 ? t - 1 : 0
                                                ),
                                                r = 1;
                                            r < t;
                                            r++
                                        )
                                            n[r - 1] = arguments[r];
                                        R.fire.apply(R, [e].concat(n));
                                    }
                                },
                                c = function () {
                                    return Tt(i.file.name);
                                },
                                f = function () {
                                    return i.file.type;
                                },
                                d = function () {
                                    return i.file.size;
                                },
                                p = function () {
                                    return i.file;
                                },
                                E = function (t, n, r) {
                                    (i.source = t),
                                        R.fireSync("init"),
                                        i.file
                                            ? R.fireSync("load-skip")
                                            : ((i.file = en(t)),
                                              n.on("init", function () {
                                                  l("load-init");
                                              }),
                                              n.on("meta", function (t) {
                                                  (i.file.size = t.size),
                                                      (i.file.filename =
                                                          t.filename),
                                                      t.source &&
                                                          ((e = qe.LIMBO),
                                                          (i.serverFileReference =
                                                              t.source),
                                                          (i.status =
                                                              Ve.PROCESSING_COMPLETE)),
                                                      l("load-meta");
                                              }),
                                              n.on("progress", function (e) {
                                                  u(Ve.LOADING),
                                                      l("load-progress", e);
                                              }),
                                              n.on("error", function (e) {
                                                  u(Ve.LOAD_ERROR),
                                                      l(
                                                          "load-request-error",
                                                          e
                                                      );
                                              }),
                                              n.on("abort", function () {
                                                  u(Ve.INIT), l("load-abort");
                                              }),
                                              n.on("load", function (t) {
                                                  i.activeLoader = null;
                                                  var n = function (t) {
                                                          (i.file = tn(t)
                                                              ? t
                                                              : i.file),
                                                              e === qe.LIMBO &&
                                                              i.serverFileReference
                                                                  ? u(
                                                                        Ve.PROCESSING_COMPLETE
                                                                    )
                                                                  : u(Ve.IDLE),
                                                              l("load");
                                                      },
                                                      o = function (e) {
                                                          (i.file = t),
                                                              l("load-meta"),
                                                              u(Ve.LOAD_ERROR),
                                                              l(
                                                                  "load-file-error",
                                                                  e
                                                              );
                                                      };
                                                  i.serverFileReference
                                                      ? n(t)
                                                      : r(t, n, o);
                                              }),
                                              n.setSource(t),
                                              (i.activeLoader = n),
                                              n.load());
                                },
                                h = function () {
                                    i.activeLoader && i.activeLoader.load();
                                },
                                _ = function () {
                                    i.activeLoader
                                        ? i.activeLoader.abort()
                                        : (u(Ve.INIT), l("load-abort"));
                                },
                                m = function e(t, n) {
                                    if (i.processingAborted)
                                        i.processingAborted = !1;
                                    else if (
                                        (u(Ve.PROCESSING),
                                        (a = null),
                                        i.file instanceof Blob)
                                    ) {
                                        t.on("load", function (e) {
                                            (i.transferId = null),
                                                (i.serverFileReference = e);
                                        }),
                                            t.on("transfer", function (e) {
                                                i.transferId = e;
                                            }),
                                            t.on(
                                                "load-perceived",
                                                function (e) {
                                                    (i.activeProcessor = null),
                                                        (i.transferId = null),
                                                        (i.serverFileReference =
                                                            e),
                                                        u(
                                                            Ve.PROCESSING_COMPLETE
                                                        ),
                                                        l(
                                                            "process-complete",
                                                            e
                                                        );
                                                }
                                            ),
                                            t.on("start", function () {
                                                l("process-start");
                                            }),
                                            t.on("error", function (e) {
                                                (i.activeProcessor = null),
                                                    u(Ve.PROCESSING_ERROR),
                                                    l("process-error", e);
                                            }),
                                            t.on("abort", function (e) {
                                                (i.activeProcessor = null),
                                                    (i.serverFileReference = e),
                                                    u(Ve.IDLE),
                                                    l("process-abort"),
                                                    a && a();
                                            }),
                                            t.on("progress", function (e) {
                                                l("process-progress", e);
                                            });
                                        var r = function (e) {
                                                i.archived ||
                                                    t.process(
                                                        e,
                                                        Object.assign({}, s)
                                                    );
                                            },
                                            o = console.error;
                                        n(i.file, r, o),
                                            (i.activeProcessor = t);
                                    } else
                                        R.on("load", function () {
                                            e(t, n);
                                        });
                                },
                                g = function () {
                                    (i.processingAborted = !1),
                                        u(Ve.PROCESSING_QUEUED);
                                },
                                I = function () {
                                    return new Promise(function (e) {
                                        if (!i.activeProcessor)
                                            return (
                                                (i.processingAborted = !0),
                                                u(Ve.IDLE),
                                                l("process-abort"),
                                                void e()
                                            );
                                        (a = function () {
                                            e();
                                        }),
                                            i.activeProcessor.abort();
                                    });
                                },
                                T = function (e, t) {
                                    return new Promise(function (n, r) {
                                        var o =
                                            null !== i.serverFileReference
                                                ? i.serverFileReference
                                                : i.transferId;
                                        null !== o
                                            ? (e(
                                                  o,
                                                  function () {
                                                      (i.serverFileReference =
                                                          null),
                                                          (i.transferId = null),
                                                          n();
                                                  },
                                                  function (e) {
                                                      t
                                                          ? (u(
                                                                Ve.PROCESSING_REVERT_ERROR
                                                            ),
                                                            l(
                                                                "process-revert-error"
                                                            ),
                                                            r(e))
                                                          : n();
                                                  }
                                              ),
                                              u(Ve.IDLE),
                                              l("process-revert"))
                                            : n();
                                    });
                                },
                                v = function (e, t, n) {
                                    var r = e.split("."),
                                        i = r[0],
                                        o = r.pop(),
                                        a = s;
                                    r.forEach(function (e) {
                                        return (a = a[e]);
                                    }),
                                        JSON.stringify(a[o]) !==
                                            JSON.stringify(t) &&
                                            ((a[o] = t),
                                            l("metadata-update", {
                                                key: i,
                                                value: s[i],
                                                silent: n,
                                            }));
                                },
                                y = function (e) {
                                    return nn(e ? s[e] : s);
                                },
                                R = Object.assign(
                                    {
                                        id: {
                                            get: function () {
                                                return r;
                                            },
                                        },
                                        origin: {
                                            get: function () {
                                                return e;
                                            },
                                            set: function (t) {
                                                return (e = t);
                                            },
                                        },
                                        serverId: {
                                            get: function () {
                                                return i.serverFileReference;
                                            },
                                        },
                                        transferId: {
                                            get: function () {
                                                return i.transferId;
                                            },
                                        },
                                        status: {
                                            get: function () {
                                                return i.status;
                                            },
                                        },
                                        filename: {
                                            get: function () {
                                                return i.file.name;
                                            },
                                        },
                                        filenameWithoutExtension: {
                                            get: function () {
                                                return Jt(i.file.name);
                                            },
                                        },
                                        fileExtension: { get: c },
                                        fileType: { get: f },
                                        fileSize: { get: d },
                                        file: { get: p },
                                        relativePath: {
                                            get: function () {
                                                return i.file._relativePath;
                                            },
                                        },
                                        source: {
                                            get: function () {
                                                return i.source;
                                            },
                                        },
                                        getMetadata: y,
                                        setMetadata: function (e, t, n) {
                                            if (le(e)) {
                                                var r = e;
                                                return (
                                                    Object.keys(r).forEach(
                                                        function (e) {
                                                            v(e, r[e], t);
                                                        }
                                                    ),
                                                    e
                                                );
                                            }
                                            return v(e, t, n), t;
                                        },
                                        extend: function (e, t) {
                                            return (O[e] = t);
                                        },
                                        abortLoad: _,
                                        retryLoad: h,
                                        requestProcessing: g,
                                        abortProcessing: I,
                                        load: E,
                                        process: m,
                                        revert: T,
                                    },
                                    Ge(),
                                    {
                                        freeze: function () {
                                            return (i.frozen = !0);
                                        },
                                        release: function () {
                                            return (i.released = !0);
                                        },
                                        released: {
                                            get: function () {
                                                return i.released;
                                            },
                                        },
                                        archive: function () {
                                            return (i.archived = !0);
                                        },
                                        archived: {
                                            get: function () {
                                                return i.archived;
                                            },
                                        },
                                    }
                                ),
                                O = o(R);
                            return O;
                        },
                        on = function (e, t) {
                            return W(t)
                                ? 0
                                : K(t)
                                ? e.findIndex(function (e) {
                                      return e.id === t;
                                  })
                                : -1;
                        },
                        an = function (e, t) {
                            var n = on(e, t);
                            if (!(n < 0)) return e[n] || null;
                        },
                        sn = function (e, t, n, r, i, o) {
                            var a = Bt(null, e, {
                                method: "GET",
                                responseType: "blob",
                            });
                            return (
                                (a.onload = function (n) {
                                    var r = n.getAllResponseHeaders(),
                                        i = xt(r).name || It(e);
                                    t(
                                        Vt(
                                            "load",
                                            n.status,
                                            Ot(n.response, i),
                                            r
                                        )
                                    );
                                }),
                                (a.onerror = function (e) {
                                    n(
                                        Vt(
                                            "error",
                                            e.status,
                                            e.statusText,
                                            e.getAllResponseHeaders()
                                        )
                                    );
                                }),
                                (a.onheaders = function (e) {
                                    o(
                                        Vt(
                                            "headers",
                                            e.status,
                                            null,
                                            e.getAllResponseHeaders()
                                        )
                                    );
                                }),
                                (a.ontimeout = qt(n)),
                                (a.onprogress = r),
                                (a.onabort = i),
                                a
                            );
                        },
                        un = function (e) {
                            return (
                                0 === e.indexOf("//") &&
                                    (e = location.protocol + e),
                                e
                                    .toLowerCase()
                                    .replace("blob:", "")
                                    .replace(/([a-z])?:\/\//, "$1")
                                    .split("/")[0]
                            );
                        },
                        ln = function (e) {
                            return (
                                (e.indexOf(":") > -1 || e.indexOf("//") > -1) &&
                                un(location.href) !== un(e)
                            );
                        },
                        cn = function (e) {
                            return function () {
                                return re(e) ? e.apply(void 0, arguments) : e;
                            };
                        },
                        fn = function (e) {
                            return !tn(e.file);
                        },
                        dn = function (e, t) {
                            clearTimeout(t.listUpdateTimeout),
                                (t.listUpdateTimeout = setTimeout(function () {
                                    e("DID_UPDATE_ITEMS", {
                                        items: nt(t.items),
                                    });
                                }, 0));
                        },
                        pn = function (e) {
                            for (
                                var t = arguments.length,
                                    n = new Array(t > 1 ? t - 1 : 0),
                                    r = 1;
                                r < t;
                                r++
                            )
                                n[r - 1] = arguments[r];
                            return new Promise(function (t) {
                                if (!e) return t(!0);
                                var r = e.apply(void 0, n);
                                return null == r
                                    ? t(!0)
                                    : "boolean" == typeof r
                                    ? t(r)
                                    : void (
                                          "function" == typeof r.then &&
                                          r.then(t)
                                      );
                            });
                        },
                        En = function (e, t) {
                            e.items.sort(function (e, n) {
                                return t(Ue(e), Ue(n));
                            });
                        },
                        hn = function (e, t) {
                            return function () {
                                var n =
                                        arguments.length > 0 &&
                                        void 0 !== arguments[0]
                                            ? arguments[0]
                                            : {},
                                    r = n.query,
                                    i = n.success,
                                    o = void 0 === i ? function () {} : i,
                                    a = n.failure,
                                    s = void 0 === a ? function () {} : a,
                                    u = we(n, ["query", "success", "failure"]),
                                    l = et(e.items, r);
                                l
                                    ? t(l, o, s, u || {})
                                    : s({
                                          error: Vt(
                                              "error",
                                              0,
                                              "Item not found"
                                          ),
                                          file: null,
                                      });
                            };
                        },
                        _n = function (e, t, n) {
                            return {
                                ABORT_ALL: function () {
                                    nt(n.items).forEach(function (e) {
                                        e.freeze(),
                                            e.abortLoad(),
                                            e.abortProcessing();
                                    });
                                },
                                DID_SET_FILES: function (t) {
                                    var r = t.value,
                                        i = (void 0 === r ? [] : r).map(
                                            function (e) {
                                                return {
                                                    source: e.source
                                                        ? e.source
                                                        : e,
                                                    options: e.options,
                                                };
                                            }
                                        ),
                                        o = nt(n.items);
                                    o.forEach(function (t) {
                                        i.find(function (e) {
                                            return (
                                                e.source === t.source ||
                                                e.source === t.file
                                            );
                                        }) ||
                                            e("REMOVE_ITEM", {
                                                query: t,
                                                remove: !1,
                                            });
                                    }),
                                        (o = nt(n.items)),
                                        i.forEach(function (t, n) {
                                            o.find(function (e) {
                                                return (
                                                    e.source === t.source ||
                                                    e.file === t.source
                                                );
                                            }) ||
                                                e(
                                                    "ADD_ITEM",
                                                    Object.assign({}, t, {
                                                        interactionMethod:
                                                            Re.NONE,
                                                        index: n,
                                                    })
                                                );
                                        });
                                },
                                DID_UPDATE_ITEM_METADATA: function (r) {
                                    var i = r.id,
                                        o = r.action,
                                        a = r.change;
                                    a.silent ||
                                        (clearTimeout(n.itemUpdateTimeout),
                                        (n.itemUpdateTimeout = setTimeout(
                                            function () {
                                                var r = an(n.items, i);
                                                if (t("IS_ASYNC")) {
                                                    r.origin === qe.LOCAL &&
                                                        e("DID_LOAD_ITEM", {
                                                            id: r.id,
                                                            error: null,
                                                            serverFileReference:
                                                                r.source,
                                                        });
                                                    var s = function () {
                                                            setTimeout(
                                                                function () {
                                                                    e(
                                                                        "REQUEST_ITEM_PROCESSING",
                                                                        {
                                                                            query: i,
                                                                        }
                                                                    );
                                                                },
                                                                32
                                                            );
                                                        },
                                                        u = function (e) {
                                                            r.revert(
                                                                Zt(
                                                                    n.options
                                                                        .server
                                                                        .url,
                                                                    n.options
                                                                        .server
                                                                        .revert
                                                                ),
                                                                t(
                                                                    "GET_FORCE_REVERT"
                                                                )
                                                            )
                                                                .then(
                                                                    e
                                                                        ? s
                                                                        : function () {}
                                                                )
                                                                .catch(
                                                                    function () {}
                                                                );
                                                        },
                                                        l = function (e) {
                                                            r.abortProcessing().then(
                                                                e
                                                                    ? s
                                                                    : function () {}
                                                            );
                                                        };
                                                    return r.status ===
                                                        Ve.PROCESSING_COMPLETE
                                                        ? u(
                                                              n.options
                                                                  .instantUpload
                                                          )
                                                        : r.status ===
                                                          Ve.PROCESSING
                                                        ? l(
                                                              n.options
                                                                  .instantUpload
                                                          )
                                                        : void (
                                                              n.options
                                                                  .instantUpload &&
                                                              s()
                                                          );
                                                }
                                                He(
                                                    "SHOULD_PREPARE_OUTPUT",
                                                    !1,
                                                    {
                                                        item: r,
                                                        query: t,
                                                        action: o,
                                                        change: a,
                                                    }
                                                ).then(function (n) {
                                                    var o = t(
                                                        "GET_BEFORE_PREPARE_FILE"
                                                    );
                                                    o && (n = o(r, n)),
                                                        n &&
                                                            e(
                                                                "REQUEST_PREPARE_OUTPUT",
                                                                {
                                                                    query: i,
                                                                    item: r,
                                                                    success:
                                                                        function (
                                                                            t
                                                                        ) {
                                                                            e(
                                                                                "DID_PREPARE_OUTPUT",
                                                                                {
                                                                                    id: i,
                                                                                    file: t,
                                                                                }
                                                                            );
                                                                        },
                                                                },
                                                                !0
                                                            );
                                                });
                                            },
                                            0
                                        )));
                                },
                                MOVE_ITEM: function (e) {
                                    var t = e.query,
                                        r = e.index,
                                        i = et(n.items, t);
                                    if (i) {
                                        var o = n.items.indexOf(i);
                                        o !==
                                            (r = ht(
                                                r,
                                                0,
                                                n.items.length - 1
                                            )) &&
                                            n.items.splice(
                                                r,
                                                0,
                                                n.items.splice(o, 1)[0]
                                            );
                                    }
                                },
                                SORT: function (r) {
                                    var i = r.compare;
                                    En(n, i),
                                        e("DID_SORT_ITEMS", {
                                            items: t("GET_ACTIVE_ITEMS"),
                                        });
                                },
                                ADD_ITEMS: function (n) {
                                    var r = n.items,
                                        i = n.index,
                                        o = n.interactionMethod,
                                        a = n.success,
                                        s = void 0 === a ? function () {} : a,
                                        u = n.failure,
                                        l = void 0 === u ? function () {} : u,
                                        c = i;
                                    if (-1 === i || void 0 === i) {
                                        var f = t("GET_ITEM_INSERT_LOCATION"),
                                            d = t("GET_TOTAL_ITEMS");
                                        c = "before" === f ? 0 : d;
                                    }
                                    var p = t("GET_IGNORED_FILES"),
                                        E = function (e) {
                                            return tn(e)
                                                ? !p.includes(
                                                      e.name.toLowerCase()
                                                  )
                                                : !W(e);
                                        },
                                        h = r.filter(E).map(function (t) {
                                            return new Promise(function (n, r) {
                                                e("ADD_ITEM", {
                                                    interactionMethod: o,
                                                    source: t.source || t,
                                                    success: n,
                                                    failure: r,
                                                    index: c++,
                                                    options: t.options || {},
                                                });
                                            });
                                        });
                                    Promise.all(h).then(s).catch(l);
                                },
                                ADD_ITEM: function (r) {
                                    var i = r.source,
                                        o = r.index,
                                        a = void 0 === o ? -1 : o,
                                        s = r.interactionMethod,
                                        u = r.success,
                                        l = void 0 === u ? function () {} : u,
                                        c = r.failure,
                                        f = void 0 === c ? function () {} : c,
                                        d = r.options,
                                        p = void 0 === d ? {} : d;
                                    if (W(i))
                                        f({
                                            error: Vt("error", 0, "No source"),
                                            file: null,
                                        });
                                    else if (
                                        !tn(i) ||
                                        !n.options.ignoredFiles.includes(
                                            i.name.toLowerCase()
                                        )
                                    ) {
                                        if (!Et(n)) {
                                            if (
                                                n.options.allowMultiple ||
                                                (!n.options.allowMultiple &&
                                                    !n.options.allowReplace)
                                            ) {
                                                var E = Vt(
                                                    "warning",
                                                    0,
                                                    "Max files"
                                                );
                                                return (
                                                    e("DID_THROW_MAX_FILES", {
                                                        source: i,
                                                        error: E,
                                                    }),
                                                    void f({
                                                        error: E,
                                                        file: null,
                                                    })
                                                );
                                            }
                                            var h = nt(n.items)[0];
                                            if (
                                                h.status ===
                                                    Ve.PROCESSING_COMPLETE ||
                                                h.status ===
                                                    Ve.PROCESSING_REVERT_ERROR
                                            ) {
                                                var _ = t("GET_FORCE_REVERT");
                                                if (
                                                    (h
                                                        .revert(
                                                            Zt(
                                                                n.options.server
                                                                    .url,
                                                                n.options.server
                                                                    .revert
                                                            ),
                                                            _
                                                        )
                                                        .then(function () {
                                                            _ &&
                                                                e("ADD_ITEM", {
                                                                    source: i,
                                                                    index: a,
                                                                    interactionMethod:
                                                                        s,
                                                                    success: l,
                                                                    failure: f,
                                                                    options: p,
                                                                });
                                                        })
                                                        .catch(function () {}),
                                                    _)
                                                )
                                                    return;
                                            }
                                            e("REMOVE_ITEM", { query: h.id });
                                        }
                                        var m =
                                                "local" === p.type
                                                    ? qe.LOCAL
                                                    : "limbo" === p.type
                                                    ? qe.LIMBO
                                                    : qe.INPUT,
                                            g = rn(
                                                m,
                                                m === qe.INPUT ? null : i,
                                                p.file
                                            );
                                        Object.keys(p.metadata || {}).forEach(
                                            function (e) {
                                                g.setMetadata(e, p.metadata[e]);
                                            }
                                        ),
                                            Xe("DID_CREATE_ITEM", g, {
                                                query: t,
                                                dispatch: e,
                                            });
                                        var I = t("GET_ITEM_INSERT_LOCATION");
                                        n.options.itemInsertLocationFreedom ||
                                            (a =
                                                "before" === I
                                                    ? -1
                                                    : n.items.length),
                                            mt(n.items, g, a),
                                            re(I) && i && En(n, I);
                                        var T = g.id;
                                        g.on("init", function () {
                                            e("DID_INIT_ITEM", { id: T });
                                        }),
                                            g.on("load-init", function () {
                                                e("DID_START_ITEM_LOAD", {
                                                    id: T,
                                                });
                                            }),
                                            g.on("load-meta", function () {
                                                e("DID_UPDATE_ITEM_META", {
                                                    id: T,
                                                });
                                            }),
                                            g.on("load-progress", function (t) {
                                                e(
                                                    "DID_UPDATE_ITEM_LOAD_PROGRESS",
                                                    { id: T, progress: t }
                                                );
                                            }),
                                            g.on(
                                                "load-request-error",
                                                function (t) {
                                                    var r = cn(
                                                        n.options
                                                            .labelFileLoadError
                                                    )(t);
                                                    if (
                                                        t.code >= 400 &&
                                                        t.code < 500
                                                    )
                                                        return (
                                                            e(
                                                                "DID_THROW_ITEM_INVALID",
                                                                {
                                                                    id: T,
                                                                    error: t,
                                                                    status: {
                                                                        main: r,
                                                                        sub:
                                                                            t.code +
                                                                            " (" +
                                                                            t.body +
                                                                            ")",
                                                                    },
                                                                }
                                                            ),
                                                            void f({
                                                                error: t,
                                                                file: Ue(g),
                                                            })
                                                        );
                                                    e(
                                                        "DID_THROW_ITEM_LOAD_ERROR",
                                                        {
                                                            id: T,
                                                            error: t,
                                                            status: {
                                                                main: r,
                                                                sub: n.options
                                                                    .labelTapToRetry,
                                                            },
                                                        }
                                                    );
                                                }
                                            ),
                                            g.on(
                                                "load-file-error",
                                                function (t) {
                                                    e(
                                                        "DID_THROW_ITEM_INVALID",
                                                        {
                                                            id: T,
                                                            error: t.status,
                                                            status: t.status,
                                                        }
                                                    ),
                                                        f({
                                                            error: t.status,
                                                            file: Ue(g),
                                                        });
                                                }
                                            ),
                                            g.on("load-abort", function () {
                                                e("REMOVE_ITEM", { query: T });
                                            }),
                                            g.on("load-skip", function () {
                                                e("COMPLETE_LOAD_ITEM", {
                                                    query: T,
                                                    item: g,
                                                    data: {
                                                        source: i,
                                                        success: l,
                                                    },
                                                });
                                            }),
                                            g.on("load", function () {
                                                var r = function (r) {
                                                    r
                                                        ? (g.on(
                                                              "metadata-update",
                                                              function (t) {
                                                                  e(
                                                                      "DID_UPDATE_ITEM_METADATA",
                                                                      {
                                                                          id: T,
                                                                          change: t,
                                                                      }
                                                                  );
                                                              }
                                                          ),
                                                          He(
                                                              "SHOULD_PREPARE_OUTPUT",
                                                              !1,
                                                              {
                                                                  item: g,
                                                                  query: t,
                                                              }
                                                          ).then(function (r) {
                                                              var o = t(
                                                                  "GET_BEFORE_PREPARE_FILE"
                                                              );
                                                              o &&
                                                                  (r = o(g, r));
                                                              var a =
                                                                  function () {
                                                                      e(
                                                                          "COMPLETE_LOAD_ITEM",
                                                                          {
                                                                              query: T,
                                                                              item: g,
                                                                              data: {
                                                                                  source: i,
                                                                                  success:
                                                                                      l,
                                                                              },
                                                                          }
                                                                      ),
                                                                          dn(
                                                                              e,
                                                                              n
                                                                          );
                                                                  };
                                                              r
                                                                  ? e(
                                                                        "REQUEST_PREPARE_OUTPUT",
                                                                        {
                                                                            query: T,
                                                                            item: g,
                                                                            success:
                                                                                function (
                                                                                    t
                                                                                ) {
                                                                                    e(
                                                                                        "DID_PREPARE_OUTPUT",
                                                                                        {
                                                                                            id: T,
                                                                                            file: t,
                                                                                        }
                                                                                    ),
                                                                                        a();
                                                                                },
                                                                        },
                                                                        !0
                                                                    )
                                                                  : a();
                                                          }))
                                                        : e("REMOVE_ITEM", {
                                                              query: T,
                                                          });
                                                };
                                                He("DID_LOAD_ITEM", g, {
                                                    query: t,
                                                    dispatch: e,
                                                })
                                                    .then(function () {
                                                        pn(
                                                            t(
                                                                "GET_BEFORE_ADD_FILE"
                                                            ),
                                                            Ue(g)
                                                        ).then(r);
                                                    })
                                                    .catch(function (t) {
                                                        if (
                                                            !t ||
                                                            !t.error ||
                                                            !t.status
                                                        )
                                                            return r(!1);
                                                        e(
                                                            "DID_THROW_ITEM_INVALID",
                                                            {
                                                                id: T,
                                                                error: t.error,
                                                                status: t.status,
                                                            }
                                                        );
                                                    });
                                            }),
                                            g.on("process-start", function () {
                                                e("DID_START_ITEM_PROCESSING", {
                                                    id: T,
                                                });
                                            }),
                                            g.on(
                                                "process-progress",
                                                function (t) {
                                                    e(
                                                        "DID_UPDATE_ITEM_PROCESS_PROGRESS",
                                                        { id: T, progress: t }
                                                    );
                                                }
                                            ),
                                            g.on("process-error", function (t) {
                                                e(
                                                    "DID_THROW_ITEM_PROCESSING_ERROR",
                                                    {
                                                        id: T,
                                                        error: t,
                                                        status: {
                                                            main: cn(
                                                                n.options
                                                                    .labelFileProcessingError
                                                            )(t),
                                                            sub: n.options
                                                                .labelTapToRetry,
                                                        },
                                                    }
                                                );
                                            }),
                                            g.on(
                                                "process-revert-error",
                                                function (t) {
                                                    e(
                                                        "DID_THROW_ITEM_PROCESSING_REVERT_ERROR",
                                                        {
                                                            id: T,
                                                            error: t,
                                                            status: {
                                                                main: cn(
                                                                    n.options
                                                                        .labelFileProcessingRevertError
                                                                )(t),
                                                                sub: n.options
                                                                    .labelTapToRetry,
                                                            },
                                                        }
                                                    );
                                                }
                                            ),
                                            g.on(
                                                "process-complete",
                                                function (t) {
                                                    e(
                                                        "DID_COMPLETE_ITEM_PROCESSING",
                                                        {
                                                            id: T,
                                                            error: null,
                                                            serverFileReference:
                                                                t,
                                                        }
                                                    ),
                                                        e("DID_DEFINE_VALUE", {
                                                            id: T,
                                                            value: t,
                                                        });
                                                }
                                            ),
                                            g.on("process-abort", function () {
                                                e("DID_ABORT_ITEM_PROCESSING", {
                                                    id: T,
                                                });
                                            }),
                                            g.on("process-revert", function () {
                                                e(
                                                    "DID_REVERT_ITEM_PROCESSING",
                                                    { id: T }
                                                ),
                                                    e("DID_DEFINE_VALUE", {
                                                        id: T,
                                                        value: null,
                                                    });
                                            }),
                                            e("DID_ADD_ITEM", {
                                                id: T,
                                                index: a,
                                                interactionMethod: s,
                                            }),
                                            dn(e, n);
                                        var v = n.options.server || {},
                                            y = v.url,
                                            R = v.load,
                                            O = v.restore,
                                            A = v.fetch;
                                        g.load(
                                            i,
                                            Ft(
                                                m === qe.INPUT
                                                    ? K(i) && ln(i) && A
                                                        ? zt(y, A)
                                                        : sn
                                                    : m === qe.LIMBO
                                                    ? zt(y, O)
                                                    : zt(y, R)
                                            ),
                                            function (e, n, r) {
                                                He("LOAD_FILE", e, { query: t })
                                                    .then(n)
                                                    .catch(r);
                                            }
                                        );
                                    }
                                },
                                REQUEST_PREPARE_OUTPUT: function (e) {
                                    var n = e.item,
                                        r = e.success,
                                        i = e.failure,
                                        o = void 0 === i ? function () {} : i,
                                        a = {
                                            error: Vt(
                                                "error",
                                                0,
                                                "Item not found"
                                            ),
                                            file: null,
                                        };
                                    if (n.archived) return o(a);
                                    He("PREPARE_OUTPUT", n.file, {
                                        query: t,
                                        item: n,
                                    }).then(function (e) {
                                        He("COMPLETE_PREPARE_OUTPUT", e, {
                                            query: t,
                                            item: n,
                                        }).then(function (e) {
                                            if (n.archived) return o(a);
                                            r(e);
                                        });
                                    });
                                },
                                COMPLETE_LOAD_ITEM: function (r) {
                                    var i = r.item,
                                        o = r.data,
                                        a = o.success,
                                        s = o.source,
                                        u = t("GET_ITEM_INSERT_LOCATION");
                                    if (
                                        (re(u) && s && En(n, u),
                                        e("DID_LOAD_ITEM", {
                                            id: i.id,
                                            error: null,
                                            serverFileReference:
                                                i.origin === qe.INPUT
                                                    ? null
                                                    : s,
                                        }),
                                        a(Ue(i)),
                                        i.origin !== qe.LOCAL)
                                    )
                                        return i.origin === qe.LIMBO
                                            ? (e(
                                                  "DID_COMPLETE_ITEM_PROCESSING",
                                                  {
                                                      id: i.id,
                                                      error: null,
                                                      serverFileReference: s,
                                                  }
                                              ),
                                              void e("DID_DEFINE_VALUE", {
                                                  id: i.id,
                                                  value: i.serverId || s,
                                              }))
                                            : void (
                                                  t("IS_ASYNC") &&
                                                  n.options.instantUpload &&
                                                  e("REQUEST_ITEM_PROCESSING", {
                                                      query: i.id,
                                                  })
                                              );
                                    e("DID_LOAD_LOCAL_ITEM", { id: i.id });
                                },
                                RETRY_ITEM_LOAD: hn(n, function (e) {
                                    e.retryLoad();
                                }),
                                REQUEST_ITEM_PREPARE: hn(n, function (t, n, r) {
                                    e(
                                        "REQUEST_PREPARE_OUTPUT",
                                        {
                                            query: t.id,
                                            item: t,
                                            success: function (r) {
                                                e("DID_PREPARE_OUTPUT", {
                                                    id: t.id,
                                                    file: r,
                                                }),
                                                    n({ file: t, output: r });
                                            },
                                            failure: r,
                                        },
                                        !0
                                    );
                                }),
                                REQUEST_ITEM_PROCESSING: hn(
                                    n,
                                    function (r, i, o) {
                                        if (
                                            r.status === Ve.IDLE ||
                                            r.status === Ve.PROCESSING_ERROR
                                        )
                                            r.status !== Ve.PROCESSING_QUEUED &&
                                                (r.requestProcessing(),
                                                e(
                                                    "DID_REQUEST_ITEM_PROCESSING",
                                                    { id: r.id }
                                                ),
                                                e(
                                                    "PROCESS_ITEM",
                                                    {
                                                        query: r,
                                                        success: i,
                                                        failure: o,
                                                    },
                                                    !0
                                                ));
                                        else {
                                            var a = function () {
                                                    return e(
                                                        "REQUEST_ITEM_PROCESSING",
                                                        {
                                                            query: r,
                                                            success: i,
                                                            failure: o,
                                                        }
                                                    );
                                                },
                                                s = function () {
                                                    return document.hidden
                                                        ? a()
                                                        : setTimeout(a, 32);
                                                };
                                            r.status ===
                                                Ve.PROCESSING_COMPLETE ||
                                            r.status ===
                                                Ve.PROCESSING_REVERT_ERROR
                                                ? r
                                                      .revert(
                                                          Zt(
                                                              n.options.server
                                                                  .url,
                                                              n.options.server
                                                                  .revert
                                                          ),
                                                          t("GET_FORCE_REVERT")
                                                      )
                                                      .then(s)
                                                      .catch(function () {})
                                                : r.status === Ve.PROCESSING &&
                                                  r.abortProcessing().then(s);
                                        }
                                    }
                                ),
                                PROCESS_ITEM: hn(n, function (r, i, o) {
                                    var a = t("GET_MAX_PARALLEL_UPLOADS");
                                    if (
                                        t("GET_ITEMS_BY_STATUS", Ve.PROCESSING)
                                            .length !== a
                                    ) {
                                        if (r.status !== Ve.PROCESSING) {
                                            var s = function t() {
                                                var r =
                                                    n.processingQueue.shift();
                                                if (r) {
                                                    var i = r.id,
                                                        o = r.success,
                                                        a = r.failure,
                                                        s = et(n.items, i);
                                                    s && !s.archived
                                                        ? e(
                                                              "PROCESS_ITEM",
                                                              {
                                                                  query: i,
                                                                  success: o,
                                                                  failure: a,
                                                              },
                                                              !0
                                                          )
                                                        : t();
                                                }
                                            };
                                            r.onOnce(
                                                "process-complete",
                                                function () {
                                                    i(Ue(r)), s();
                                                    var o = n.options.server;
                                                    if (
                                                        n.options
                                                            .instantUpload &&
                                                        r.origin === qe.LOCAL &&
                                                        re(o.remove)
                                                    ) {
                                                        var a = function () {};
                                                        (r.origin = qe.LIMBO),
                                                            n.options.server.remove(
                                                                r.source,
                                                                a,
                                                                a
                                                            );
                                                    }
                                                    t(
                                                        "GET_ITEMS_BY_STATUS",
                                                        Ve.PROCESSING_COMPLETE
                                                    ).length ===
                                                        n.items.length &&
                                                        e(
                                                            "DID_COMPLETE_ITEM_PROCESSING_ALL"
                                                        );
                                                }
                                            ),
                                                r.onOnce(
                                                    "process-error",
                                                    function (e) {
                                                        o({
                                                            error: e,
                                                            file: Ue(r),
                                                        }),
                                                            s();
                                                    }
                                                );
                                            var u = n.options;
                                            r.process(
                                                $t(
                                                    Xt(
                                                        u.server.url,
                                                        u.server.process,
                                                        u.name,
                                                        {
                                                            chunkTransferId:
                                                                r.transferId,
                                                            chunkServer:
                                                                u.server.patch,
                                                            chunkUploads:
                                                                u.chunkUploads,
                                                            chunkForce:
                                                                u.chunkForce,
                                                            chunkSize:
                                                                u.chunkSize,
                                                            chunkRetryDelays:
                                                                u.chunkRetryDelays,
                                                        }
                                                    ),
                                                    {
                                                        allowMinimumUploadDuration:
                                                            t(
                                                                "GET_ALLOW_MINIMUM_UPLOAD_DURATION"
                                                            ),
                                                    }
                                                ),
                                                function (n, i, o) {
                                                    He("PREPARE_OUTPUT", n, {
                                                        query: t,
                                                        item: r,
                                                    })
                                                        .then(function (t) {
                                                            e(
                                                                "DID_PREPARE_OUTPUT",
                                                                {
                                                                    id: r.id,
                                                                    file: t,
                                                                }
                                                            ),
                                                                i(t);
                                                        })
                                                        .catch(o);
                                                }
                                            );
                                        }
                                    } else n.processingQueue.push({ id: r.id, success: i, failure: o });
                                }),
                                RETRY_ITEM_PROCESSING: hn(n, function (t) {
                                    e("REQUEST_ITEM_PROCESSING", { query: t });
                                }),
                                REQUEST_REMOVE_ITEM: hn(n, function (n) {
                                    pn(t("GET_BEFORE_REMOVE_FILE"), Ue(n)).then(
                                        function (t) {
                                            t && e("REMOVE_ITEM", { query: n });
                                        }
                                    );
                                }),
                                RELEASE_ITEM: hn(n, function (e) {
                                    e.release();
                                }),
                                REMOVE_ITEM: hn(n, function (r, i, o, a) {
                                    var s = function () {
                                            var t = r.id;
                                            an(n.items, t).archive(),
                                                e("DID_REMOVE_ITEM", {
                                                    error: null,
                                                    id: t,
                                                    item: r,
                                                }),
                                                dn(e, n),
                                                i(Ue(r));
                                        },
                                        u = n.options.server;
                                    r.origin === qe.LOCAL &&
                                    u &&
                                    re(u.remove) &&
                                    !1 !== a.remove
                                        ? (e("DID_START_ITEM_REMOVE", {
                                              id: r.id,
                                          }),
                                          u.remove(
                                              r.source,
                                              function () {
                                                  return s();
                                              },
                                              function (t) {
                                                  e(
                                                      "DID_THROW_ITEM_REMOVE_ERROR",
                                                      {
                                                          id: r.id,
                                                          error: Vt(
                                                              "error",
                                                              0,
                                                              t,
                                                              null
                                                          ),
                                                          status: {
                                                              main: cn(
                                                                  n.options
                                                                      .labelFileRemoveError
                                                              )(t),
                                                              sub: n.options
                                                                  .labelTapToRetry,
                                                          },
                                                      }
                                                  );
                                              }
                                          ))
                                        : (((a.revert &&
                                              r.origin !== qe.LOCAL &&
                                              null !== r.serverId) ||
                                              (n.options.chunkUploads &&
                                                  r.file.size >
                                                      n.options.chunkSize) ||
                                              (n.options.chunkUploads &&
                                                  n.options.chunkForce)) &&
                                              r.revert(
                                                  Zt(
                                                      n.options.server.url,
                                                      n.options.server.revert
                                                  ),
                                                  t("GET_FORCE_REVERT")
                                              ),
                                          s());
                                }),
                                ABORT_ITEM_LOAD: hn(n, function (e) {
                                    e.abortLoad();
                                }),
                                ABORT_ITEM_PROCESSING: hn(n, function (t) {
                                    t.serverId
                                        ? e("REVERT_ITEM_PROCESSING", {
                                              id: t.id,
                                          })
                                        : t.abortProcessing().then(function () {
                                              n.options.instantUpload &&
                                                  e("REMOVE_ITEM", {
                                                      query: t.id,
                                                  });
                                          });
                                }),
                                REQUEST_REVERT_ITEM_PROCESSING: hn(
                                    n,
                                    function (r) {
                                        if (n.options.instantUpload) {
                                            var i = function (t) {
                                                    t &&
                                                        e(
                                                            "REVERT_ITEM_PROCESSING",
                                                            { query: r }
                                                        );
                                                },
                                                o = t("GET_BEFORE_REMOVE_FILE");
                                            if (!o) return i(!0);
                                            var a = o(Ue(r));
                                            return null == a
                                                ? i(!0)
                                                : "boolean" == typeof a
                                                ? i(a)
                                                : void (
                                                      "function" ==
                                                          typeof a.then &&
                                                      a.then(i)
                                                  );
                                        }
                                        e("REVERT_ITEM_PROCESSING", {
                                            query: r,
                                        });
                                    }
                                ),
                                REVERT_ITEM_PROCESSING: hn(n, function (r) {
                                    r.revert(
                                        Zt(
                                            n.options.server.url,
                                            n.options.server.revert
                                        ),
                                        t("GET_FORCE_REVERT")
                                    )
                                        .then(function () {
                                            (n.options.instantUpload ||
                                                fn(r)) &&
                                                e("REMOVE_ITEM", {
                                                    query: r.id,
                                                });
                                        })
                                        .catch(function () {});
                                }),
                                SET_OPTIONS: function (t) {
                                    var n = t.options,
                                        r = Object.keys(n),
                                        i = mn.filter(function (e) {
                                            return r.includes(e);
                                        });
                                    []
                                        .concat(
                                            Le(i),
                                            Le(
                                                Object.keys(n).filter(function (
                                                    e
                                                ) {
                                                    return !i.includes(e);
                                                })
                                            )
                                        )
                                        .forEach(function (t) {
                                            e(
                                                "SET_" +
                                                    Ie(t, "_").toUpperCase(),
                                                { value: n[t] }
                                            );
                                        });
                                },
                            };
                        },
                        mn = ["server"],
                        gn = function (e) {
                            return e;
                        },
                        In = function (e) {
                            return document.createElement(e);
                        },
                        Tn = function (e, t) {
                            var n = e.childNodes[0];
                            n
                                ? t !== n.nodeValue && (n.nodeValue = t)
                                : ((n = document.createTextNode(t)),
                                  e.appendChild(n));
                        },
                        vn = function (e, t, n, r) {
                            var i = (((r % 360) - 90) * Math.PI) / 180;
                            return {
                                x: e + n * Math.cos(i),
                                y: t + n * Math.sin(i),
                            };
                        },
                        yn = function (e, t, n, r, i, o) {
                            var a = vn(e, t, n, i),
                                s = vn(e, t, n, r);
                            return [
                                "M",
                                a.x,
                                a.y,
                                "A",
                                n,
                                n,
                                0,
                                o,
                                0,
                                s.x,
                                s.y,
                            ].join(" ");
                        },
                        Rn = function (e, t, n, r, i) {
                            var o = 1;
                            return (
                                i > r && i - r <= 0.5 && (o = 0),
                                r > i && r - i >= 0.5 && (o = 0),
                                yn(
                                    e,
                                    t,
                                    n,
                                    360 * Math.min(0.9999, r),
                                    360 * Math.min(0.9999, i),
                                    o
                                )
                            );
                        },
                        On = function (e) {
                            var t = e.root,
                                n = e.props;
                            (n.spin = !1), (n.progress = 0), (n.opacity = 0);
                            var r = c("svg");
                            (t.ref.path = c("path", {
                                "stroke-width": 2,
                                "stroke-linecap": "round",
                            })),
                                r.appendChild(t.ref.path),
                                (t.ref.svg = r),
                                t.appendChild(r);
                        },
                        An = function (e) {
                            var t = e.root,
                                n = e.props;
                            if (0 !== n.opacity) {
                                n.align && (t.element.dataset.align = n.align);
                                var r = parseInt(
                                        a(t.ref.path, "stroke-width"),
                                        10
                                    ),
                                    i = 0.5 * t.rect.element.width,
                                    o = 0,
                                    s = 0;
                                n.spin
                                    ? ((o = 0), (s = 0.5))
                                    : ((o = 0), (s = n.progress));
                                var u = Rn(i, i, i - r, o, s);
                                a(t.ref.path, "d", u),
                                    a(
                                        t.ref.path,
                                        "stroke-opacity",
                                        n.spin || n.progress > 0 ? 1 : 0
                                    );
                            }
                        },
                        Dn = B({
                            tag: "div",
                            name: "progress-indicator",
                            ignoreRectUpdate: !0,
                            ignoreRect: !0,
                            create: On,
                            write: An,
                            mixins: {
                                apis: ["progress", "spin", "align"],
                                styles: ["opacity"],
                                animations: {
                                    opacity: { type: "tween", duration: 500 },
                                    progress: {
                                        type: "spring",
                                        stiffness: 0.95,
                                        damping: 0.65,
                                        mass: 10,
                                    },
                                },
                            },
                        }),
                        Sn = function (e) {
                            var t = e.root,
                                n = e.props;
                            (t.element.innerHTML =
                                (n.icon || "") +
                                "<span>" +
                                n.label +
                                "</span>"),
                                (n.isDisabled = !1);
                        },
                        wn = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = n.isDisabled,
                                i = t.query("GET_DISABLED") || 0 === n.opacity;
                            i && !r
                                ? ((n.isDisabled = !0),
                                  a(t.element, "disabled", "disabled"))
                                : !i &&
                                  r &&
                                  ((n.isDisabled = !1),
                                  t.element.removeAttribute("disabled"));
                        },
                        Ln = B({
                            tag: "button",
                            attributes: { type: "button" },
                            ignoreRect: !0,
                            ignoreRectUpdate: !0,
                            name: "file-action-button",
                            mixins: {
                                apis: ["label"],
                                styles: [
                                    "translateX",
                                    "translateY",
                                    "scaleX",
                                    "scaleY",
                                    "opacity",
                                ],
                                animations: {
                                    scaleX: "spring",
                                    scaleY: "spring",
                                    translateX: "spring",
                                    translateY: "spring",
                                    opacity: { type: "tween", duration: 250 },
                                },
                                listeners: !0,
                            },
                            create: Sn,
                            write: wn,
                        }),
                        Mn = function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : ".",
                                n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 1e3,
                                r =
                                    arguments.length > 3 &&
                                    void 0 !== arguments[3]
                                        ? arguments[3]
                                        : {},
                                i = r.labelBytes,
                                o = void 0 === i ? "bytes" : i,
                                a = r.labelKilobytes,
                                s = void 0 === a ? "KB" : a,
                                u = r.labelMegabytes,
                                l = void 0 === u ? "MB" : u,
                                c = r.labelGigabytes,
                                f = void 0 === c ? "GB" : c,
                                d = n,
                                p = n * n,
                                E = n * n * n;
                            return (e = Math.round(Math.abs(e))) < d
                                ? e + " " + o
                                : e < p
                                ? Math.floor(e / d) + " " + s
                                : e < E
                                ? Pn(e / p, 1, t) + " " + l
                                : Pn(e / E, 2, t) + " " + f;
                        },
                        Pn = function (e, t, n) {
                            return e
                                .toFixed(t)
                                .split(".")
                                .filter(function (e) {
                                    return "0" !== e;
                                })
                                .join(n);
                        },
                        bn = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = In("span");
                            (r.className = "filepond--file-info-main"),
                                a(r, "aria-hidden", "true"),
                                t.appendChild(r),
                                (t.ref.fileName = r);
                            var i = In("span");
                            (i.className = "filepond--file-info-sub"),
                                t.appendChild(i),
                                (t.ref.fileSize = i),
                                Tn(
                                    i,
                                    t.query("GET_LABEL_FILE_WAITING_FOR_SIZE")
                                ),
                                Tn(r, gn(t.query("GET_ITEM_NAME", n.id)));
                        },
                        Cn = function (e) {
                            var t = e.root,
                                n = e.props;
                            Tn(
                                t.ref.fileSize,
                                Mn(
                                    t.query("GET_ITEM_SIZE", n.id),
                                    ".",
                                    t.query("GET_FILE_SIZE_BASE"),
                                    t.query("GET_FILE_SIZE_LABELS", t.query)
                                )
                            ),
                                Tn(
                                    t.ref.fileName,
                                    gn(t.query("GET_ITEM_NAME", n.id))
                                );
                        },
                        Nn = function (e) {
                            var t = e.root,
                                n = e.props;
                            te(t.query("GET_ITEM_SIZE", n.id))
                                ? Cn({ root: t, props: n })
                                : Tn(
                                      t.ref.fileSize,
                                      t.query(
                                          "GET_LABEL_FILE_SIZE_NOT_AVAILABLE"
                                      )
                                  );
                        },
                        Gn = B({
                            name: "file-info",
                            ignoreRect: !0,
                            ignoreRectUpdate: !0,
                            write: q({
                                DID_LOAD_ITEM: Cn,
                                DID_UPDATE_ITEM_META: Cn,
                                DID_THROW_ITEM_LOAD_ERROR: Nn,
                                DID_THROW_ITEM_INVALID: Nn,
                            }),
                            didCreateView: function (e) {
                                Xe(
                                    "CREATE_VIEW",
                                    Object.assign({}, e, { view: e })
                                );
                            },
                            create: bn,
                            mixins: {
                                styles: ["translateX", "translateY"],
                                animations: {
                                    translateX: "spring",
                                    translateY: "spring",
                                },
                            },
                        }),
                        xn = function (e) {
                            return Math.round(100 * e);
                        },
                        Fn = function (e) {
                            var t = e.root,
                                n = In("span");
                            (n.className = "filepond--file-status-main"),
                                t.appendChild(n),
                                (t.ref.main = n);
                            var r = In("span");
                            (r.className = "filepond--file-status-sub"),
                                t.appendChild(r),
                                (t.ref.sub = r),
                                Un({ root: t, action: { progress: null } });
                        },
                        Un = function (e) {
                            var t = e.root,
                                n = e.action,
                                r =
                                    null === n.progress
                                        ? t.query("GET_LABEL_FILE_LOADING")
                                        : t.query("GET_LABEL_FILE_LOADING") +
                                          " " +
                                          xn(n.progress) +
                                          "%";
                            Tn(t.ref.main, r),
                                Tn(
                                    t.ref.sub,
                                    t.query("GET_LABEL_TAP_TO_CANCEL")
                                );
                        },
                        Bn = function (e) {
                            var t = e.root,
                                n = e.action,
                                r =
                                    null === n.progress
                                        ? t.query("GET_LABEL_FILE_PROCESSING")
                                        : t.query("GET_LABEL_FILE_PROCESSING") +
                                          " " +
                                          xn(n.progress) +
                                          "%";
                            Tn(t.ref.main, r),
                                Tn(
                                    t.ref.sub,
                                    t.query("GET_LABEL_TAP_TO_CANCEL")
                                );
                        },
                        Vn = function (e) {
                            var t = e.root;
                            Tn(
                                t.ref.main,
                                t.query("GET_LABEL_FILE_PROCESSING")
                            ),
                                Tn(
                                    t.ref.sub,
                                    t.query("GET_LABEL_TAP_TO_CANCEL")
                                );
                        },
                        qn = function (e) {
                            var t = e.root;
                            Tn(
                                t.ref.main,
                                t.query("GET_LABEL_FILE_PROCESSING_ABORTED")
                            ),
                                Tn(
                                    t.ref.sub,
                                    t.query("GET_LABEL_TAP_TO_RETRY")
                                );
                        },
                        kn = function (e) {
                            var t = e.root;
                            Tn(
                                t.ref.main,
                                t.query("GET_LABEL_FILE_PROCESSING_COMPLETE")
                            ),
                                Tn(t.ref.sub, t.query("GET_LABEL_TAP_TO_UNDO"));
                        },
                        Yn = function (e) {
                            var t = e.root;
                            Tn(t.ref.main, ""), Tn(t.ref.sub, "");
                        },
                        zn = function (e) {
                            var t = e.root,
                                n = e.action;
                            Tn(t.ref.main, n.status.main),
                                Tn(t.ref.sub, n.status.sub);
                        },
                        Wn = B({
                            name: "file-status",
                            ignoreRect: !0,
                            ignoreRectUpdate: !0,
                            write: q({
                                DID_LOAD_ITEM: Yn,
                                DID_REVERT_ITEM_PROCESSING: Yn,
                                DID_REQUEST_ITEM_PROCESSING: Vn,
                                DID_ABORT_ITEM_PROCESSING: qn,
                                DID_COMPLETE_ITEM_PROCESSING: kn,
                                DID_UPDATE_ITEM_PROCESS_PROGRESS: Bn,
                                DID_UPDATE_ITEM_LOAD_PROGRESS: Un,
                                DID_THROW_ITEM_LOAD_ERROR: zn,
                                DID_THROW_ITEM_INVALID: zn,
                                DID_THROW_ITEM_PROCESSING_ERROR: zn,
                                DID_THROW_ITEM_PROCESSING_REVERT_ERROR: zn,
                                DID_THROW_ITEM_REMOVE_ERROR: zn,
                            }),
                            didCreateView: function (e) {
                                Xe(
                                    "CREATE_VIEW",
                                    Object.assign({}, e, { view: e })
                                );
                            },
                            create: Fn,
                            mixins: {
                                styles: ["translateX", "translateY", "opacity"],
                                animations: {
                                    opacity: { type: "tween", duration: 250 },
                                    translateX: "spring",
                                    translateY: "spring",
                                },
                            },
                        }),
                        jn = {
                            AbortItemLoad: {
                                label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
                                action: "ABORT_ITEM_LOAD",
                                className: "filepond--action-abort-item-load",
                                align: "LOAD_INDICATOR_POSITION",
                            },
                            RetryItemLoad: {
                                label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
                                action: "RETRY_ITEM_LOAD",
                                icon: "GET_ICON_RETRY",
                                className: "filepond--action-retry-item-load",
                                align: "BUTTON_PROCESS_ITEM_POSITION",
                            },
                            RemoveItem: {
                                label: "GET_LABEL_BUTTON_REMOVE_ITEM",
                                action: "REQUEST_REMOVE_ITEM",
                                icon: "GET_ICON_REMOVE",
                                className: "filepond--action-remove-item",
                                align: "BUTTON_REMOVE_ITEM_POSITION",
                            },
                            ProcessItem: {
                                label: "GET_LABEL_BUTTON_PROCESS_ITEM",
                                action: "REQUEST_ITEM_PROCESSING",
                                icon: "GET_ICON_PROCESS",
                                className: "filepond--action-process-item",
                                align: "BUTTON_PROCESS_ITEM_POSITION",
                            },
                            AbortItemProcessing: {
                                label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
                                action: "ABORT_ITEM_PROCESSING",
                                className:
                                    "filepond--action-abort-item-processing",
                                align: "BUTTON_PROCESS_ITEM_POSITION",
                            },
                            RetryItemProcessing: {
                                label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
                                action: "RETRY_ITEM_PROCESSING",
                                icon: "GET_ICON_RETRY",
                                className:
                                    "filepond--action-retry-item-processing",
                                align: "BUTTON_PROCESS_ITEM_POSITION",
                            },
                            RevertItemProcessing: {
                                label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
                                action: "REQUEST_REVERT_ITEM_PROCESSING",
                                icon: "GET_ICON_UNDO",
                                className:
                                    "filepond--action-revert-item-processing",
                                align: "BUTTON_PROCESS_ITEM_POSITION",
                            },
                        },
                        Hn = [];
                    i(jn, function (e) {
                        Hn.push(e);
                    });
                    var Xn,
                        Zn = function (e) {
                            if ("right" === tr(e)) return 0;
                            var t = e.ref.buttonRemoveItem.rect.element;
                            return t.hidden ? null : t.width + t.left;
                        },
                        Qn = function (e) {
                            return e.ref.buttonAbortItemLoad.rect.element.width;
                        },
                        Kn = function (e) {
                            return Math.floor(
                                e.ref.buttonRemoveItem.rect.element.height / 4
                            );
                        },
                        $n = function (e) {
                            return Math.floor(
                                e.ref.buttonRemoveItem.rect.element.left / 2
                            );
                        },
                        Jn = function (e) {
                            return e.query("GET_STYLE_LOAD_INDICATOR_POSITION");
                        },
                        er = function (e) {
                            return e.query(
                                "GET_STYLE_PROGRESS_INDICATOR_POSITION"
                            );
                        },
                        tr = function (e) {
                            return e.query(
                                "GET_STYLE_BUTTON_REMOVE_ITEM_POSITION"
                            );
                        },
                        nr = {
                            buttonAbortItemLoad: { opacity: 0 },
                            buttonRetryItemLoad: { opacity: 0 },
                            buttonRemoveItem: { opacity: 0 },
                            buttonProcessItem: { opacity: 0 },
                            buttonAbortItemProcessing: { opacity: 0 },
                            buttonRetryItemProcessing: { opacity: 0 },
                            buttonRevertItemProcessing: { opacity: 0 },
                            loadProgressIndicator: { opacity: 0, align: Jn },
                            processProgressIndicator: { opacity: 0, align: er },
                            processingCompleteIndicator: {
                                opacity: 0,
                                scaleX: 0.75,
                                scaleY: 0.75,
                            },
                            info: { translateX: 0, translateY: 0, opacity: 0 },
                            status: {
                                translateX: 0,
                                translateY: 0,
                                opacity: 0,
                            },
                        },
                        rr = {
                            buttonRemoveItem: { opacity: 1 },
                            buttonProcessItem: { opacity: 1 },
                            info: { translateX: Zn },
                            status: { translateX: Zn },
                        },
                        ir = {
                            buttonAbortItemProcessing: { opacity: 1 },
                            processProgressIndicator: { opacity: 1 },
                            status: { opacity: 1 },
                        },
                        or = {
                            DID_THROW_ITEM_INVALID: {
                                buttonRemoveItem: { opacity: 1 },
                                info: { translateX: Zn },
                                status: { translateX: Zn, opacity: 1 },
                            },
                            DID_START_ITEM_LOAD: {
                                buttonAbortItemLoad: { opacity: 1 },
                                loadProgressIndicator: { opacity: 1 },
                                status: { opacity: 1 },
                            },
                            DID_THROW_ITEM_LOAD_ERROR: {
                                buttonRetryItemLoad: { opacity: 1 },
                                buttonRemoveItem: { opacity: 1 },
                                info: { translateX: Zn },
                                status: { opacity: 1 },
                            },
                            DID_START_ITEM_REMOVE: {
                                processProgressIndicator: {
                                    opacity: 1,
                                    align: tr,
                                },
                                info: { translateX: Zn },
                                status: { opacity: 0 },
                            },
                            DID_THROW_ITEM_REMOVE_ERROR: {
                                processProgressIndicator: {
                                    opacity: 0,
                                    align: tr,
                                },
                                buttonRemoveItem: { opacity: 1 },
                                info: { translateX: Zn },
                                status: { opacity: 1, translateX: Zn },
                            },
                            DID_LOAD_ITEM: rr,
                            DID_LOAD_LOCAL_ITEM: {
                                buttonRemoveItem: { opacity: 1 },
                                info: { translateX: Zn },
                                status: { translateX: Zn },
                            },
                            DID_START_ITEM_PROCESSING: ir,
                            DID_REQUEST_ITEM_PROCESSING: ir,
                            DID_UPDATE_ITEM_PROCESS_PROGRESS: ir,
                            DID_COMPLETE_ITEM_PROCESSING: {
                                buttonRevertItemProcessing: { opacity: 1 },
                                info: { opacity: 1 },
                                status: { opacity: 1 },
                            },
                            DID_THROW_ITEM_PROCESSING_ERROR: {
                                buttonRemoveItem: { opacity: 1 },
                                buttonRetryItemProcessing: { opacity: 1 },
                                status: { opacity: 1 },
                                info: { translateX: Zn },
                            },
                            DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
                                buttonRevertItemProcessing: { opacity: 1 },
                                status: { opacity: 1 },
                                info: { opacity: 1 },
                            },
                            DID_ABORT_ITEM_PROCESSING: {
                                buttonRemoveItem: { opacity: 1 },
                                buttonProcessItem: { opacity: 1 },
                                info: { translateX: Zn },
                                status: { opacity: 1 },
                            },
                            DID_REVERT_ITEM_PROCESSING: rr,
                        },
                        ar = B({
                            create: function (e) {
                                var t = e.root;
                                t.element.innerHTML = t.query("GET_ICON_DONE");
                            },
                            name: "processing-complete-indicator",
                            ignoreRect: !0,
                            mixins: {
                                styles: ["scaleX", "scaleY", "opacity"],
                                animations: {
                                    scaleX: "spring",
                                    scaleY: "spring",
                                    opacity: { type: "tween", duration: 250 },
                                },
                            },
                        }),
                        sr = function (e) {
                            var t,
                                n = e.root,
                                r = e.props,
                                o = Object.keys(jn).reduce(function (e, t) {
                                    return (e[t] = Object.assign({}, jn[t])), e;
                                }, {}),
                                a = r.id,
                                s = n.query("GET_ALLOW_REVERT"),
                                u = n.query("GET_ALLOW_REMOVE"),
                                l = n.query("GET_ALLOW_PROCESS"),
                                c = n.query("GET_INSTANT_UPLOAD"),
                                f = n.query("IS_ASYNC"),
                                d = n.query(
                                    "GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN"
                                );
                            f
                                ? l && !s
                                    ? (t = function (e) {
                                          return !/RevertItemProcessing/.test(
                                              e
                                          );
                                      })
                                    : !l && s
                                    ? (t = function (e) {
                                          return !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(
                                              e
                                          );
                                      })
                                    : l ||
                                      s ||
                                      (t = function (e) {
                                          return !/Process/.test(e);
                                      })
                                : (t = function (e) {
                                      return !/Process/.test(e);
                                  });
                            var p = t ? Hn.filter(t) : Hn.concat();
                            if (
                                (c &&
                                    s &&
                                    ((o.RevertItemProcessing.label =
                                        "GET_LABEL_BUTTON_REMOVE_ITEM"),
                                    (o.RevertItemProcessing.icon =
                                        "GET_ICON_REMOVE")),
                                f && !s)
                            ) {
                                var E = or.DID_COMPLETE_ITEM_PROCESSING;
                                (E.info.translateX = $n),
                                    (E.info.translateY = Kn),
                                    (E.status.translateY = Kn),
                                    (E.processingCompleteIndicator = {
                                        opacity: 1,
                                        scaleX: 1,
                                        scaleY: 1,
                                    });
                            }
                            if (
                                (f &&
                                    !l &&
                                    ([
                                        "DID_START_ITEM_PROCESSING",
                                        "DID_REQUEST_ITEM_PROCESSING",
                                        "DID_UPDATE_ITEM_PROCESS_PROGRESS",
                                        "DID_THROW_ITEM_PROCESSING_ERROR",
                                    ].forEach(function (e) {
                                        or[e].status.translateY = Kn;
                                    }),
                                    (or.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX =
                                        Qn)),
                                d && s)
                            ) {
                                o.RevertItemProcessing.align =
                                    "BUTTON_REMOVE_ITEM_POSITION";
                                var h = or.DID_COMPLETE_ITEM_PROCESSING;
                                (h.info.translateX = Zn),
                                    (h.status.translateY = Kn),
                                    (h.processingCompleteIndicator = {
                                        opacity: 1,
                                        scaleX: 1,
                                        scaleY: 1,
                                    });
                            }
                            u || (o.RemoveItem.disabled = !0),
                                i(o, function (e, t) {
                                    var r = n.createChildView(Ln, {
                                        label: n.query(t.label),
                                        icon: n.query(t.icon),
                                        opacity: 0,
                                    });
                                    p.includes(e) && n.appendChildView(r),
                                        t.disabled &&
                                            (r.element.setAttribute(
                                                "disabled",
                                                "disabled"
                                            ),
                                            r.element.setAttribute(
                                                "hidden",
                                                "hidden"
                                            )),
                                        (r.element.dataset.align = n.query(
                                            "GET_STYLE_" + t.align
                                        )),
                                        r.element.classList.add(t.className),
                                        r.on("click", function (e) {
                                            e.stopPropagation(),
                                                t.disabled ||
                                                    n.dispatch(t.action, {
                                                        query: a,
                                                    });
                                        }),
                                        (n.ref["button" + e] = r);
                                }),
                                (n.ref.processingCompleteIndicator =
                                    n.appendChildView(n.createChildView(ar))),
                                (n.ref.processingCompleteIndicator.element.dataset.align =
                                    n.query(
                                        "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"
                                    )),
                                (n.ref.info = n.appendChildView(
                                    n.createChildView(Gn, { id: a })
                                )),
                                (n.ref.status = n.appendChildView(
                                    n.createChildView(Wn, { id: a })
                                ));
                            var _ = n.appendChildView(
                                n.createChildView(Dn, {
                                    opacity: 0,
                                    align: n.query(
                                        "GET_STYLE_LOAD_INDICATOR_POSITION"
                                    ),
                                })
                            );
                            _.element.classList.add("filepond--load-indicator"),
                                (n.ref.loadProgressIndicator = _);
                            var m = n.appendChildView(
                                n.createChildView(Dn, {
                                    opacity: 0,
                                    align: n.query(
                                        "GET_STYLE_PROGRESS_INDICATOR_POSITION"
                                    ),
                                })
                            );
                            m.element.classList.add(
                                "filepond--process-indicator"
                            ),
                                (n.ref.processProgressIndicator = m),
                                (n.ref.activeStyles = []);
                        },
                        ur = function (e) {
                            var t = e.root,
                                n = e.actions,
                                r = e.props;
                            lr({ root: t, actions: n, props: r });
                            var o = n
                                .concat()
                                .filter(function (e) {
                                    return /^DID_/.test(e.type);
                                })
                                .reverse()
                                .find(function (e) {
                                    return or[e.type];
                                });
                            if (o) {
                                t.ref.activeStyles = [];
                                var a = or[o.type];
                                i(nr, function (e, n) {
                                    var r = t.ref[e];
                                    i(n, function (n, i) {
                                        var o =
                                            a[e] && void 0 !== a[e][n]
                                                ? a[e][n]
                                                : i;
                                        t.ref.activeStyles.push({
                                            control: r,
                                            key: n,
                                            value: o,
                                        });
                                    });
                                });
                            }
                            t.ref.activeStyles.forEach(function (e) {
                                var n = e.control,
                                    r = e.key,
                                    i = e.value;
                                n[r] = "function" == typeof i ? i(t) : i;
                            });
                        },
                        lr = q({
                            DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING:
                                function (e) {
                                    var t = e.root,
                                        n = e.action;
                                    t.ref.buttonAbortItemProcessing.label =
                                        n.value;
                                },
                            DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: function (e) {
                                var t = e.root,
                                    n = e.action;
                                t.ref.buttonAbortItemLoad.label = n.value;
                            },
                            DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: function (
                                e
                            ) {
                                var t = e.root,
                                    n = e.action;
                                t.ref.buttonAbortItemRemoval.label = n.value;
                            },
                            DID_REQUEST_ITEM_PROCESSING: function (e) {
                                var t = e.root;
                                (t.ref.processProgressIndicator.spin = !0),
                                    (t.ref.processProgressIndicator.progress = 0);
                            },
                            DID_START_ITEM_LOAD: function (e) {
                                var t = e.root;
                                (t.ref.loadProgressIndicator.spin = !0),
                                    (t.ref.loadProgressIndicator.progress = 0);
                            },
                            DID_START_ITEM_REMOVE: function (e) {
                                var t = e.root;
                                (t.ref.processProgressIndicator.spin = !0),
                                    (t.ref.processProgressIndicator.progress = 0);
                            },
                            DID_UPDATE_ITEM_LOAD_PROGRESS: function (e) {
                                var t = e.root,
                                    n = e.action;
                                (t.ref.loadProgressIndicator.spin = !1),
                                    (t.ref.loadProgressIndicator.progress =
                                        n.progress);
                            },
                            DID_UPDATE_ITEM_PROCESS_PROGRESS: function (e) {
                                var t = e.root,
                                    n = e.action;
                                (t.ref.processProgressIndicator.spin = !1),
                                    (t.ref.processProgressIndicator.progress =
                                        n.progress);
                            },
                        }),
                        cr = B({
                            create: sr,
                            write: ur,
                            didCreateView: function (e) {
                                Xe(
                                    "CREATE_VIEW",
                                    Object.assign({}, e, { view: e })
                                );
                            },
                            name: "file",
                        }),
                        fr = function (e) {
                            var t = e.root,
                                n = e.props;
                            (t.ref.fileName = In("legend")),
                                t.appendChild(t.ref.fileName),
                                (t.ref.file = t.appendChildView(
                                    t.createChildView(cr, { id: n.id })
                                )),
                                (t.ref.data = !1);
                        },
                        dr = function (e) {
                            var t = e.root,
                                n = e.props;
                            Tn(
                                t.ref.fileName,
                                gn(t.query("GET_ITEM_NAME", n.id))
                            );
                        },
                        pr = B({
                            create: fr,
                            ignoreRect: !0,
                            write: q({ DID_LOAD_ITEM: dr }),
                            didCreateView: function (e) {
                                Xe(
                                    "CREATE_VIEW",
                                    Object.assign({}, e, { view: e })
                                );
                            },
                            tag: "fieldset",
                            name: "file-wrapper",
                        }),
                        Er = { type: "spring", damping: 0.6, mass: 7 },
                        hr = function (e) {
                            var t = e.root,
                                n = e.props;
                            [
                                { name: "top" },
                                {
                                    name: "center",
                                    props: { translateY: null, scaleY: null },
                                    mixins: {
                                        animations: { scaleY: Er },
                                        styles: ["translateY", "scaleY"],
                                    },
                                },
                                {
                                    name: "bottom",
                                    props: { translateY: null },
                                    mixins: {
                                        animations: { translateY: Er },
                                        styles: ["translateY"],
                                    },
                                },
                            ].forEach(function (e) {
                                _r(t, e, n.name);
                            }),
                                t.element.classList.add("filepond--" + n.name),
                                (t.ref.scalable = null);
                        },
                        _r = function (e, t, n) {
                            var r = B({
                                    name: "panel-" + t.name + " filepond--" + n,
                                    mixins: t.mixins,
                                    ignoreRectUpdate: !0,
                                }),
                                i = e.createChildView(r, t.props);
                            e.ref[t.name] = e.appendChildView(i);
                        },
                        mr = function (e) {
                            var t = e.root,
                                n = e.props;
                            if (
                                ((null !== t.ref.scalable &&
                                    n.scalable === t.ref.scalable) ||
                                    ((t.ref.scalable =
                                        !Z(n.scalable) || n.scalable),
                                    (t.element.dataset.scalable =
                                        t.ref.scalable)),
                                n.height)
                            ) {
                                var r = t.ref.top.rect.element,
                                    i = t.ref.bottom.rect.element,
                                    o = Math.max(r.height + i.height, n.height);
                                (t.ref.center.translateY = r.height),
                                    (t.ref.center.scaleY =
                                        (o - r.height - i.height) / 100),
                                    (t.ref.bottom.translateY = o - i.height);
                            }
                        },
                        gr = B({
                            name: "panel",
                            read: function (e) {
                                var t = e.root;
                                return (e.props.heightCurrent =
                                    t.ref.bottom.translateY);
                            },
                            write: mr,
                            create: hr,
                            ignoreRect: !0,
                            mixins: {
                                apis: ["height", "heightCurrent", "scalable"],
                            },
                        }),
                        Ir = function (e) {
                            var t = e.map(function (e) {
                                    return e.id;
                                }),
                                n = void 0;
                            return {
                                setIndex: function (e) {
                                    n = e;
                                },
                                getIndex: function () {
                                    return n;
                                },
                                getItemIndex: function (e) {
                                    return t.indexOf(e.id);
                                },
                            };
                        },
                        Tr = {
                            type: "spring",
                            stiffness: 0.75,
                            damping: 0.45,
                            mass: 10,
                        },
                        vr = "spring",
                        yr = {
                            DID_START_ITEM_LOAD: "busy",
                            DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
                            DID_THROW_ITEM_INVALID: "load-invalid",
                            DID_THROW_ITEM_LOAD_ERROR: "load-error",
                            DID_LOAD_ITEM: "idle",
                            DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
                            DID_START_ITEM_REMOVE: "busy",
                            DID_START_ITEM_PROCESSING: "busy processing",
                            DID_REQUEST_ITEM_PROCESSING: "busy processing",
                            DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
                            DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
                            DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
                            DID_THROW_ITEM_PROCESSING_REVERT_ERROR:
                                "processing-revert-error",
                            DID_ABORT_ITEM_PROCESSING: "cancelled",
                            DID_REVERT_ITEM_PROCESSING: "idle",
                        },
                        Rr = function (e) {
                            var t = e.root,
                                n = e.props;
                            if (
                                ((t.ref.handleClick = function (e) {
                                    return t.dispatch("DID_ACTIVATE_ITEM", {
                                        id: n.id,
                                    });
                                }),
                                (t.element.id = "filepond--item-" + n.id),
                                t.element.addEventListener(
                                    "click",
                                    t.ref.handleClick
                                ),
                                (t.ref.container = t.appendChildView(
                                    t.createChildView(pr, { id: n.id })
                                )),
                                (t.ref.panel = t.appendChildView(
                                    t.createChildView(gr, {
                                        name: "item-panel",
                                    })
                                )),
                                (t.ref.panel.height = null),
                                (n.markedForRemoval = !1),
                                t.query("GET_ALLOW_REORDER"))
                            ) {
                                t.element.dataset.dragState = "idle";
                                var r = function (e) {
                                    if (e.isPrimary) {
                                        var r = !1,
                                            i = { x: e.pageX, y: e.pageY };
                                        (n.dragOrigin = {
                                            x: t.translateX,
                                            y: t.translateY,
                                        }),
                                            (n.dragCenter = {
                                                x: e.offsetX,
                                                y: e.offsetY,
                                            });
                                        var o = Ir(t.query("GET_ACTIVE_ITEMS"));
                                        t.dispatch("DID_GRAB_ITEM", {
                                            id: n.id,
                                            dragState: o,
                                        });
                                        var a = function (e) {
                                                e.isPrimary &&
                                                    (e.stopPropagation(),
                                                    e.preventDefault(),
                                                    (n.dragOffset = {
                                                        x: e.pageX - i.x,
                                                        y: e.pageY - i.y,
                                                    }),
                                                    n.dragOffset.x *
                                                        n.dragOffset.x +
                                                        n.dragOffset.y *
                                                            n.dragOffset.y >
                                                        16 &&
                                                        !r &&
                                                        ((r = !0),
                                                        t.element.removeEventListener(
                                                            "click",
                                                            t.ref.handleClick
                                                        )),
                                                    t.dispatch(
                                                        "DID_DRAG_ITEM",
                                                        {
                                                            id: n.id,
                                                            dragState: o,
                                                        }
                                                    ));
                                            },
                                            s = function e(s) {
                                                s.isPrimary &&
                                                    (document.removeEventListener(
                                                        "pointermove",
                                                        a
                                                    ),
                                                    document.removeEventListener(
                                                        "pointerup",
                                                        e
                                                    ),
                                                    (n.dragOffset = {
                                                        x: s.pageX - i.x,
                                                        y: s.pageY - i.y,
                                                    }),
                                                    t.dispatch(
                                                        "DID_DROP_ITEM",
                                                        {
                                                            id: n.id,
                                                            dragState: o,
                                                        }
                                                    ),
                                                    r &&
                                                        setTimeout(function () {
                                                            return t.element.addEventListener(
                                                                "click",
                                                                t.ref
                                                                    .handleClick
                                                            );
                                                        }, 0));
                                            };
                                        document.addEventListener(
                                            "pointermove",
                                            a
                                        ),
                                            document.addEventListener(
                                                "pointerup",
                                                s
                                            );
                                    }
                                };
                                t.element.addEventListener("pointerdown", r);
                            }
                        },
                        Or = q({
                            DID_UPDATE_PANEL_HEIGHT: function (e) {
                                var t = e.root,
                                    n = e.action;
                                t.height = n.height;
                            },
                        }),
                        Ar = q(
                            {
                                DID_GRAB_ITEM: function (e) {
                                    var t = e.root;
                                    e.props.dragOrigin = {
                                        x: t.translateX,
                                        y: t.translateY,
                                    };
                                },
                                DID_DRAG_ITEM: function (e) {
                                    e.root.element.dataset.dragState = "drag";
                                },
                                DID_DROP_ITEM: function (e) {
                                    var t = e.root,
                                        n = e.props;
                                    (n.dragOffset = null),
                                        (n.dragOrigin = null),
                                        (t.element.dataset.dragState = "drop");
                                },
                            },
                            function (e) {
                                var t = e.root,
                                    n = e.actions,
                                    r = e.props,
                                    i = e.shouldOptimize;
                                "drop" === t.element.dataset.dragState &&
                                    t.scaleX <= 1 &&
                                    (t.element.dataset.dragState = "idle");
                                var o = n
                                    .concat()
                                    .filter(function (e) {
                                        return /^DID_/.test(e.type);
                                    })
                                    .reverse()
                                    .find(function (e) {
                                        return yr[e.type];
                                    });
                                o &&
                                    o.type !== r.currentState &&
                                    ((r.currentState = o.type),
                                    (t.element.dataset.filepondItemState =
                                        yr[r.currentState] || ""));
                                var a =
                                    t.query("GET_ITEM_PANEL_ASPECT_RATIO") ||
                                    t.query("GET_PANEL_ASPECT_RATIO");
                                a
                                    ? i || (t.height = t.rect.element.width * a)
                                    : (Or({ root: t, actions: n, props: r }),
                                      !t.height &&
                                          t.ref.container.rect.element.height >
                                              0 &&
                                          (t.height =
                                              t.ref.container.rect.element.height)),
                                    i && (t.ref.panel.height = null),
                                    (t.ref.panel.height = t.height);
                            }
                        ),
                        Dr = B({
                            create: Rr,
                            write: Ar,
                            destroy: function (e) {
                                var t = e.root,
                                    n = e.props;
                                t.element.removeEventListener(
                                    "click",
                                    t.ref.handleClick
                                ),
                                    t.dispatch("RELEASE_ITEM", { query: n.id });
                            },
                            tag: "li",
                            name: "item",
                            mixins: {
                                apis: [
                                    "id",
                                    "interactionMethod",
                                    "markedForRemoval",
                                    "spawnDate",
                                    "dragCenter",
                                    "dragOrigin",
                                    "dragOffset",
                                ],
                                styles: [
                                    "translateX",
                                    "translateY",
                                    "scaleX",
                                    "scaleY",
                                    "opacity",
                                    "height",
                                ],
                                animations: {
                                    scaleX: vr,
                                    scaleY: vr,
                                    translateX: Tr,
                                    translateY: Tr,
                                    opacity: { type: "tween", duration: 150 },
                                },
                            },
                        }),
                        Sr = function (e, t) {
                            return Math.max(1, Math.floor((e + 1) / t));
                        },
                        wr = function (e, t, n) {
                            if (n) {
                                var r = e.rect.element.width,
                                    i = t.length,
                                    o = null;
                                if (0 === i || n.top < t[0].rect.element.top)
                                    return -1;
                                var a = t[0].rect.element,
                                    s = a.marginLeft + a.marginRight,
                                    u = a.width + s,
                                    l = Sr(r, u);
                                if (1 === l) {
                                    for (var c = 0; c < i; c++) {
                                        var f = t[c],
                                            d =
                                                f.rect.outer.top +
                                                0.5 * f.rect.element.height;
                                        if (n.top < d) return c;
                                    }
                                    return i;
                                }
                                for (
                                    var p = a.marginTop + a.marginBottom,
                                        E = a.height + p,
                                        h = 0;
                                    h < i;
                                    h++
                                ) {
                                    var _ = (h % l) * u,
                                        m = Math.floor(h / l) * E,
                                        g = m - a.marginTop,
                                        I = _ + u,
                                        T = m + E + a.marginBottom;
                                    if (n.top < T && n.top > g) {
                                        if (n.left < I) return h;
                                        o = h !== i - 1 ? h : null;
                                    }
                                }
                                return null !== o ? o : i;
                            }
                        },
                        Lr = {
                            height: 0,
                            width: 0,
                            get getHeight() {
                                return this.height;
                            },
                            set setHeight(e) {
                                (0 !== this.height && 0 !== e) ||
                                    (this.height = e);
                            },
                            get getWidth() {
                                return this.width;
                            },
                            set setWidth(e) {
                                (0 !== this.width && 0 !== e) ||
                                    (this.width = e);
                            },
                            setDimensions: function (e, t) {
                                (0 !== this.height && 0 !== e) ||
                                    (this.height = e),
                                    (0 !== this.width && 0 !== t) ||
                                        (this.width = t);
                            },
                        },
                        Mr = function (e) {
                            var t = e.root;
                            a(t.element, "role", "list"),
                                (t.ref.lastItemSpanwDate = Date.now());
                        },
                        Pr = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = n.id,
                                i = n.index,
                                o = n.interactionMethod;
                            t.ref.addIndex = i;
                            var a = Date.now(),
                                s = a,
                                u = 1;
                            if (o !== Re.NONE) {
                                u = 0;
                                var l = t.query("GET_ITEM_INSERT_INTERVAL"),
                                    c = a - t.ref.lastItemSpanwDate;
                                s = c < l ? a + (l - c) : a;
                            }
                            (t.ref.lastItemSpanwDate = s),
                                t.appendChildView(
                                    t.createChildView(Dr, {
                                        spawnDate: s,
                                        id: r,
                                        opacity: u,
                                        interactionMethod: o,
                                    }),
                                    i
                                );
                        },
                        br = function (e, t, n) {
                            var r =
                                    arguments.length > 3 &&
                                    void 0 !== arguments[3]
                                        ? arguments[3]
                                        : 0,
                                i =
                                    arguments.length > 4 &&
                                    void 0 !== arguments[4]
                                        ? arguments[4]
                                        : 1;
                            e.dragOffset
                                ? ((e.translateX = null),
                                  (e.translateY = null),
                                  (e.translateX =
                                      e.dragOrigin.x + e.dragOffset.x),
                                  (e.translateY =
                                      e.dragOrigin.y + e.dragOffset.y),
                                  (e.scaleX = 1.025),
                                  (e.scaleY = 1.025))
                                : ((e.translateX = t),
                                  (e.translateY = n),
                                  Date.now() > e.spawnDate &&
                                      (0 === e.opacity && Cr(e, t, n, r, i),
                                      (e.scaleX = 1),
                                      (e.scaleY = 1),
                                      (e.opacity = 1)));
                        },
                        Cr = function (e, t, n, r, i) {
                            e.interactionMethod === Re.NONE
                                ? ((e.translateX = null),
                                  (e.translateX = t),
                                  (e.translateY = null),
                                  (e.translateY = n))
                                : e.interactionMethod === Re.DROP
                                ? ((e.translateX = null),
                                  (e.translateX = t - 20 * r),
                                  (e.translateY = null),
                                  (e.translateY = n - 10 * i),
                                  (e.scaleX = 0.8),
                                  (e.scaleY = 0.8))
                                : e.interactionMethod === Re.BROWSE
                                ? ((e.translateY = null),
                                  (e.translateY = n - 30))
                                : e.interactionMethod === Re.API &&
                                  ((e.translateX = null),
                                  (e.translateX = t - 30),
                                  (e.translateY = null));
                        },
                        Nr = function (e) {
                            var t = e.root,
                                n = e.action.id,
                                r = t.childViews.find(function (e) {
                                    return e.id === n;
                                });
                            r &&
                                ((r.scaleX = 0.9),
                                (r.scaleY = 0.9),
                                (r.opacity = 0),
                                (r.markedForRemoval = !0));
                        },
                        Gr = function (e) {
                            return (
                                e.rect.element.height +
                                0.5 * e.rect.element.marginBottom +
                                0.5 * e.rect.element.marginTop
                            );
                        },
                        xr = function (e) {
                            return (
                                e.rect.element.width +
                                0.5 * e.rect.element.marginLeft +
                                0.5 * e.rect.element.marginRight
                            );
                        },
                        Fr = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = n.id,
                                i = n.dragState,
                                o = t.query("GET_ITEM", { id: r }),
                                a = t.childViews.find(function (e) {
                                    return e.id === r;
                                }),
                                s = t.childViews.length,
                                u = i.getItemIndex(o);
                            if (a) {
                                var l = {
                                        x:
                                            a.dragOrigin.x +
                                            a.dragOffset.x +
                                            a.dragCenter.x,
                                        y:
                                            a.dragOrigin.y +
                                            a.dragOffset.y +
                                            a.dragCenter.y,
                                    },
                                    c = Gr(a),
                                    f = xr(a),
                                    d = Math.floor(t.rect.outer.width / f);
                                d > s && (d = s);
                                var p = Math.floor(s / d + 1);
                                (Lr.setHeight = c * p), (Lr.setWidth = f * d);
                                var E = {
                                        y: Math.floor(l.y / c),
                                        x: Math.floor(l.x / f),
                                        getGridIndex: function () {
                                            return l.y > Lr.getHeight ||
                                                l.y < 0 ||
                                                l.x > Lr.getWidth ||
                                                l.x < 0
                                                ? u
                                                : this.y * d + this.x;
                                        },
                                        getColIndex: function () {
                                            for (
                                                var e =
                                                        t.query(
                                                            "GET_ACTIVE_ITEMS"
                                                        ),
                                                    n = t.childViews.filter(
                                                        function (e) {
                                                            return e.rect
                                                                .element.height;
                                                        }
                                                    ),
                                                    r = e.map(function (e) {
                                                        return n.find(function (
                                                            t
                                                        ) {
                                                            return (
                                                                t.id === e.id
                                                            );
                                                        });
                                                    }),
                                                    i = r.findIndex(function (
                                                        e
                                                    ) {
                                                        return e === a;
                                                    }),
                                                    o = Gr(a),
                                                    s = r.length,
                                                    u = s,
                                                    c = 0,
                                                    f = 0,
                                                    d = 0;
                                                d < s;
                                                d++
                                            )
                                                if (
                                                    ((c = (f = c) + Gr(r[d])),
                                                    l.y < c)
                                                ) {
                                                    if (i > d) {
                                                        if (l.y < f + o) {
                                                            u = d;
                                                            break;
                                                        }
                                                        continue;
                                                    }
                                                    u = d;
                                                    break;
                                                }
                                            return u;
                                        },
                                    },
                                    h =
                                        d > 1
                                            ? E.getGridIndex()
                                            : E.getColIndex();
                                t.dispatch("MOVE_ITEM", { query: a, index: h });
                                var _ = i.getIndex();
                                if (void 0 === _ || _ !== h) {
                                    if ((i.setIndex(h), void 0 === _)) return;
                                    t.dispatch("DID_REORDER_ITEMS", {
                                        items: t.query("GET_ACTIVE_ITEMS"),
                                        origin: u,
                                        target: h,
                                    });
                                }
                            }
                        },
                        Ur = q({
                            DID_ADD_ITEM: Pr,
                            DID_REMOVE_ITEM: Nr,
                            DID_DRAG_ITEM: Fr,
                        }),
                        Br = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = e.actions,
                                i = e.shouldOptimize;
                            Ur({ root: t, props: n, actions: r });
                            var o = n.dragCoordinates,
                                a = t.rect.element.width,
                                s = t.childViews.filter(function (e) {
                                    return e.rect.element.height;
                                }),
                                u = t
                                    .query("GET_ACTIVE_ITEMS")
                                    .map(function (e) {
                                        return s.find(function (t) {
                                            return t.id === e.id;
                                        });
                                    })
                                    .filter(function (e) {
                                        return e;
                                    }),
                                l = o ? wr(t, u, o) : null,
                                c = t.ref.addIndex || null;
                            t.ref.addIndex = null;
                            var f = 0,
                                d = 0,
                                p = 0;
                            if (0 !== u.length) {
                                var E = u[0].rect.element,
                                    h = E.marginTop + E.marginBottom,
                                    _ = E.marginLeft + E.marginRight,
                                    m = E.width + _,
                                    g = E.height + h,
                                    I = Sr(a, m);
                                if (1 === I) {
                                    var T = 0,
                                        v = 0;
                                    u.forEach(function (e, t) {
                                        if (l) {
                                            var n = t - l;
                                            v =
                                                -2 === n
                                                    ? 0.25 * -h
                                                    : -1 === n
                                                    ? 0.75 * -h
                                                    : 0 === n
                                                    ? 0.75 * h
                                                    : 1 === n
                                                    ? 0.25 * h
                                                    : 0;
                                        }
                                        i &&
                                            ((e.translateX = null),
                                            (e.translateY = null)),
                                            e.markedForRemoval ||
                                                br(e, 0, T + v);
                                        var r =
                                            (e.rect.element.height + h) *
                                            (e.markedForRemoval
                                                ? e.opacity
                                                : 1);
                                        T += r;
                                    });
                                } else {
                                    var y = 0,
                                        R = 0;
                                    u.forEach(function (e, t) {
                                        t === l && (f = 1),
                                            t === c && (p += 1),
                                            e.markedForRemoval &&
                                                e.opacity < 0.5 &&
                                                (d -= 1);
                                        var n = t + p + f + d,
                                            r = n % I,
                                            o = Math.floor(n / I),
                                            a = r * m,
                                            s = o * g,
                                            u = Math.sign(a - y),
                                            E = Math.sign(s - R);
                                        (y = a),
                                            (R = s),
                                            e.markedForRemoval ||
                                                (i &&
                                                    ((e.translateX = null),
                                                    (e.translateY = null)),
                                                br(e, a, s, u, E));
                                    });
                                }
                            }
                        },
                        Vr = function (e, t) {
                            return t.filter(function (t) {
                                return (
                                    !t.data || !t.data.id || e.id === t.data.id
                                );
                            });
                        },
                        qr = B({
                            create: Mr,
                            write: Br,
                            tag: "ul",
                            name: "list",
                            didWriteView: function (e) {
                                var t = e.root;
                                t.childViews
                                    .filter(function (e) {
                                        return (
                                            e.markedForRemoval &&
                                            0 === e.opacity &&
                                            e.resting
                                        );
                                    })
                                    .forEach(function (e) {
                                        e._destroy(), t.removeChildView(e);
                                    });
                            },
                            filterFrameActionsForChild: Vr,
                            mixins: { apis: ["dragCoordinates"] },
                        }),
                        kr = function (e) {
                            var t = e.root,
                                n = e.props;
                            (t.ref.list = t.appendChildView(
                                t.createChildView(qr)
                            )),
                                (n.dragCoordinates = null),
                                (n.overflowing = !1);
                        },
                        Yr = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = e.action;
                            t.query("GET_ITEM_INSERT_LOCATION_FREEDOM") &&
                                (n.dragCoordinates = {
                                    left:
                                        r.position.scopeLeft -
                                        t.ref.list.rect.element.left,
                                    top:
                                        r.position.scopeTop -
                                        (t.rect.outer.top +
                                            t.rect.element.marginTop +
                                            t.rect.element.scrollTop),
                                });
                        },
                        zr = q({
                            DID_DRAG: Yr,
                            DID_END_DRAG: function (e) {
                                e.props.dragCoordinates = null;
                            },
                        }),
                        Wr = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = e.actions;
                            if (
                                (zr({ root: t, props: n, actions: r }),
                                (t.ref.list.dragCoordinates =
                                    n.dragCoordinates),
                                n.overflowing &&
                                    !n.overflow &&
                                    ((n.overflowing = !1),
                                    (t.element.dataset.state = ""),
                                    (t.height = null)),
                                n.overflow)
                            ) {
                                var i = Math.round(n.overflow);
                                i !== t.height &&
                                    ((n.overflowing = !0),
                                    (t.element.dataset.state = "overflow"),
                                    (t.height = i));
                            }
                        },
                        jr = B({
                            create: kr,
                            write: Wr,
                            name: "list-scroller",
                            mixins: {
                                apis: ["overflow", "dragCoordinates"],
                                styles: ["height", "translateY"],
                                animations: { translateY: "spring" },
                            },
                        }),
                        Hr = function (e, t, n) {
                            n
                                ? a(
                                      e,
                                      t,
                                      arguments.length > 3 &&
                                          void 0 !== arguments[3]
                                          ? arguments[3]
                                          : ""
                                  )
                                : e.removeAttribute(t);
                        },
                        Xr = function (e) {
                            if (e && "" !== e.value) {
                                try {
                                    e.value = "";
                                } catch (e) {}
                                if (e.value) {
                                    var t = In("form"),
                                        n = e.parentNode,
                                        r = e.nextSibling;
                                    t.appendChild(e),
                                        t.reset(),
                                        r
                                            ? n.insertBefore(e, r)
                                            : n.appendChild(e);
                                }
                            }
                        },
                        Zr = function (e) {
                            var t = e.root,
                                n = e.props;
                            (t.element.id = "filepond--browser-" + n.id),
                                a(t.element, "name", t.query("GET_NAME")),
                                a(
                                    t.element,
                                    "aria-controls",
                                    "filepond--assistant-" + n.id
                                ),
                                a(
                                    t.element,
                                    "aria-labelledby",
                                    "filepond--drop-label-" + n.id
                                ),
                                Qr({
                                    root: t,
                                    action: {
                                        value: t.query(
                                            "GET_ACCEPTED_FILE_TYPES"
                                        ),
                                    },
                                }),
                                Kr({
                                    root: t,
                                    action: {
                                        value: t.query("GET_ALLOW_MULTIPLE"),
                                    },
                                }),
                                $r({
                                    root: t,
                                    action: {
                                        value: t.query(
                                            "GET_ALLOW_DIRECTORIES_ONLY"
                                        ),
                                    },
                                }),
                                Jr({ root: t }),
                                ei({
                                    root: t,
                                    action: { value: t.query("GET_REQUIRED") },
                                }),
                                ti({
                                    root: t,
                                    action: {
                                        value: t.query("GET_CAPTURE_METHOD"),
                                    },
                                }),
                                (t.ref.handleChange = function (e) {
                                    if (t.element.value) {
                                        var r = Array.from(t.element.files).map(
                                            function (e) {
                                                return (
                                                    (e._relativePath =
                                                        e.webkitRelativePath),
                                                    e
                                                );
                                            }
                                        );
                                        setTimeout(function () {
                                            n.onload(r), Xr(t.element);
                                        }, 250);
                                    }
                                }),
                                t.element.addEventListener(
                                    "change",
                                    t.ref.handleChange
                                );
                        },
                        Qr = function (e) {
                            var t = e.root,
                                n = e.action;
                            t.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") &&
                                Hr(
                                    t.element,
                                    "accept",
                                    !!n.value,
                                    n.value ? n.value.join(",") : ""
                                );
                        },
                        Kr = function (e) {
                            var t = e.root,
                                n = e.action;
                            Hr(t.element, "multiple", n.value);
                        },
                        $r = function (e) {
                            var t = e.root,
                                n = e.action;
                            Hr(t.element, "webkitdirectory", n.value);
                        },
                        Jr = function (e) {
                            var t = e.root,
                                n = t.query("GET_DISABLED"),
                                r = t.query("GET_ALLOW_BROWSE"),
                                i = n || !r;
                            Hr(t.element, "disabled", i);
                        },
                        ei = function (e) {
                            var t = e.root;
                            e.action.value
                                ? 0 === t.query("GET_TOTAL_ITEMS") &&
                                  Hr(t.element, "required", !0)
                                : Hr(t.element, "required", !1);
                        },
                        ti = function (e) {
                            var t = e.root,
                                n = e.action;
                            Hr(
                                t.element,
                                "capture",
                                !!n.value,
                                !0 === n.value ? "" : n.value
                            );
                        },
                        ni = function (e) {
                            var t = e.root,
                                n = t.element;
                            t.query("GET_TOTAL_ITEMS") > 0
                                ? (Hr(n, "required", !1), Hr(n, "name", !1))
                                : (Hr(n, "name", !0, t.query("GET_NAME")),
                                  t.query("GET_CHECK_VALIDITY") &&
                                      n.setCustomValidity(""),
                                  t.query("GET_REQUIRED") &&
                                      Hr(n, "required", !0));
                        },
                        ri = function (e) {
                            var t = e.root;
                            t.query("GET_CHECK_VALIDITY") &&
                                t.element.setCustomValidity(
                                    t.query("GET_LABEL_INVALID_FIELD")
                                );
                        },
                        ii = B({
                            tag: "input",
                            name: "browser",
                            ignoreRect: !0,
                            ignoreRectUpdate: !0,
                            attributes: { type: "file" },
                            create: Zr,
                            destroy: function (e) {
                                var t = e.root;
                                t.element.removeEventListener(
                                    "change",
                                    t.ref.handleChange
                                );
                            },
                            write: q({
                                DID_LOAD_ITEM: ni,
                                DID_REMOVE_ITEM: ni,
                                DID_THROW_ITEM_INVALID: ri,
                                DID_SET_DISABLED: Jr,
                                DID_SET_ALLOW_BROWSE: Jr,
                                DID_SET_ALLOW_DIRECTORIES_ONLY: $r,
                                DID_SET_ALLOW_MULTIPLE: Kr,
                                DID_SET_ACCEPTED_FILE_TYPES: Qr,
                                DID_SET_CAPTURE_METHOD: ti,
                                DID_SET_REQUIRED: ei,
                            }),
                        }),
                        oi = { ENTER: 13, SPACE: 32 },
                        ai = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = In("label");
                            a(r, "for", "filepond--browser-" + n.id),
                                a(r, "id", "filepond--drop-label-" + n.id),
                                a(r, "aria-hidden", "true"),
                                (t.ref.handleKeyDown = function (e) {
                                    (e.keyCode === oi.ENTER ||
                                        e.keyCode === oi.SPACE) &&
                                        (e.preventDefault(),
                                        t.ref.label.click());
                                }),
                                (t.ref.handleClick = function (e) {
                                    e.target === r ||
                                        r.contains(e.target) ||
                                        t.ref.label.click();
                                }),
                                r.addEventListener(
                                    "keydown",
                                    t.ref.handleKeyDown
                                ),
                                t.element.addEventListener(
                                    "click",
                                    t.ref.handleClick
                                ),
                                si(r, n.caption),
                                t.appendChild(r),
                                (t.ref.label = r);
                        },
                        si = function (e, t) {
                            e.innerHTML = t;
                            var n = e.querySelector(".filepond--label-action");
                            return n && a(n, "tabindex", "0"), t;
                        },
                        ui = B({
                            name: "drop-label",
                            ignoreRect: !0,
                            create: ai,
                            destroy: function (e) {
                                var t = e.root;
                                t.ref.label.addEventListener(
                                    "keydown",
                                    t.ref.handleKeyDown
                                ),
                                    t.element.removeEventListener(
                                        "click",
                                        t.ref.handleClick
                                    );
                            },
                            write: q({
                                DID_SET_LABEL_IDLE: function (e) {
                                    var t = e.root,
                                        n = e.action;
                                    si(t.ref.label, n.value);
                                },
                            }),
                            mixins: {
                                styles: ["opacity", "translateX", "translateY"],
                                animations: {
                                    opacity: { type: "tween", duration: 150 },
                                    translateX: "spring",
                                    translateY: "spring",
                                },
                            },
                        }),
                        li = B({
                            name: "drip-blob",
                            ignoreRect: !0,
                            mixins: {
                                styles: [
                                    "translateX",
                                    "translateY",
                                    "scaleX",
                                    "scaleY",
                                    "opacity",
                                ],
                                animations: {
                                    scaleX: "spring",
                                    scaleY: "spring",
                                    translateX: "spring",
                                    translateY: "spring",
                                    opacity: { type: "tween", duration: 250 },
                                },
                            },
                        }),
                        ci = function (e) {
                            var t = e.root,
                                n = 0.5 * t.rect.element.width,
                                r = 0.5 * t.rect.element.height;
                            t.ref.blob = t.appendChildView(
                                t.createChildView(li, {
                                    opacity: 0,
                                    scaleX: 2.5,
                                    scaleY: 2.5,
                                    translateX: n,
                                    translateY: r,
                                })
                            );
                        },
                        fi = function (e) {
                            var t = e.root,
                                n = e.action;
                            t.ref.blob
                                ? ((t.ref.blob.translateX =
                                      n.position.scopeLeft),
                                  (t.ref.blob.translateY = n.position.scopeTop),
                                  (t.ref.blob.scaleX = 1),
                                  (t.ref.blob.scaleY = 1),
                                  (t.ref.blob.opacity = 1))
                                : ci({ root: t });
                        },
                        di = function (e) {
                            var t = e.root;
                            t.ref.blob && (t.ref.blob.opacity = 0);
                        },
                        pi = function (e) {
                            var t = e.root;
                            t.ref.blob &&
                                ((t.ref.blob.scaleX = 2.5),
                                (t.ref.blob.scaleY = 2.5),
                                (t.ref.blob.opacity = 0));
                        },
                        Ei = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = e.actions;
                            hi({ root: t, props: n, actions: r });
                            var i = t.ref.blob;
                            0 === r.length &&
                                i &&
                                0 === i.opacity &&
                                (t.removeChildView(i), (t.ref.blob = null));
                        },
                        hi = q({
                            DID_DRAG: fi,
                            DID_DROP: pi,
                            DID_END_DRAG: di,
                        }),
                        _i = B({
                            ignoreRect: !0,
                            ignoreRectUpdate: !0,
                            name: "drip",
                            write: Ei,
                        }),
                        mi = function (e, t) {
                            try {
                                var n = new DataTransfer();
                                t.forEach(function (e) {
                                    e instanceof File
                                        ? n.items.add(e)
                                        : n.items.add(
                                              new File([e], e.name, {
                                                  type: e.type,
                                              })
                                          );
                                }),
                                    (e.files = n.files);
                            } catch (e) {
                                return !1;
                            }
                            return !0;
                        },
                        gi = function (e) {
                            return (e.root.ref.fields = {});
                        },
                        Ii = function (e, t) {
                            return e.ref.fields[t];
                        },
                        Ti = function (e) {
                            e.query("GET_ACTIVE_ITEMS").forEach(function (t) {
                                e.ref.fields[t.id] &&
                                    e.element.appendChild(e.ref.fields[t.id]);
                            });
                        },
                        vi = function (e) {
                            var t = e.root;
                            return Ti(t);
                        },
                        yi = function (e) {
                            var t = e.root,
                                n = e.action,
                                r =
                                    !(
                                        t.query("GET_ITEM", n.id).origin ===
                                        qe.LOCAL
                                    ) && t.query("SHOULD_UPDATE_FILE_INPUT"),
                                i = In("input");
                            (i.type = r ? "file" : "hidden"),
                                (i.name = t.query("GET_NAME")),
                                (i.disabled = t.query("GET_DISABLED")),
                                (t.ref.fields[n.id] = i),
                                Ti(t);
                        },
                        Ri = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = Ii(t, n.id);
                            if (
                                r &&
                                (null !== n.serverFileReference &&
                                    (r.value = n.serverFileReference),
                                t.query("SHOULD_UPDATE_FILE_INPUT"))
                            ) {
                                var i = t.query("GET_ITEM", n.id);
                                mi(r, [i.file]);
                            }
                        },
                        Oi = function (e) {
                            var t = e.root,
                                n = e.action;
                            t.query("SHOULD_UPDATE_FILE_INPUT") &&
                                setTimeout(function () {
                                    var e = Ii(t, n.id);
                                    e && mi(e, [n.file]);
                                }, 0);
                        },
                        Ai = function (e) {
                            var t = e.root;
                            t.element.disabled = t.query("GET_DISABLED");
                        },
                        Di = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = Ii(t, n.id);
                            r &&
                                (r.parentNode && r.parentNode.removeChild(r),
                                delete t.ref.fields[n.id]);
                        },
                        Si = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = Ii(t, n.id);
                            r &&
                                (null === n.value
                                    ? r.removeAttribute("value")
                                    : (r.value = n.value),
                                Ti(t));
                        },
                        wi = q({
                            DID_SET_DISABLED: Ai,
                            DID_ADD_ITEM: yi,
                            DID_LOAD_ITEM: Ri,
                            DID_REMOVE_ITEM: Di,
                            DID_DEFINE_VALUE: Si,
                            DID_PREPARE_OUTPUT: Oi,
                            DID_REORDER_ITEMS: vi,
                            DID_SORT_ITEMS: vi,
                        }),
                        Li = B({
                            tag: "fieldset",
                            name: "data",
                            create: gi,
                            write: wi,
                            ignoreRect: !0,
                        }),
                        Mi = function (e) {
                            return "getRootNode" in e
                                ? e.getRootNode()
                                : document;
                        },
                        Pi = [
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "bmp",
                            "webp",
                            "svg",
                            "tiff",
                        ],
                        bi = ["css", "csv", "html", "txt"],
                        Ci = {
                            zip: "zip|compressed",
                            epub: "application/epub+zip",
                        },
                        Ni = function () {
                            var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : "";
                            return (
                                (e = e.toLowerCase()),
                                Pi.includes(e)
                                    ? "image/" +
                                      ("jpg" === e
                                          ? "jpeg"
                                          : "svg" === e
                                          ? "svg+xml"
                                          : e)
                                    : bi.includes(e)
                                    ? "text/" + e
                                    : Ci[e] || ""
                            );
                        },
                        Gi = function (e) {
                            return new Promise(function (t, n) {
                                var r = Wi(e);
                                if (r.length && !xi(e)) return t(r);
                                Fi(e).then(t);
                            });
                        },
                        xi = function (e) {
                            return !!e.files && e.files.length > 0;
                        },
                        Fi = function (e) {
                            return new Promise(function (t, n) {
                                var r = (e.items ? Array.from(e.items) : [])
                                    .filter(function (e) {
                                        return Ui(e);
                                    })
                                    .map(function (e) {
                                        return Bi(e);
                                    });
                                r.length
                                    ? Promise.all(r)
                                          .then(function (e) {
                                              var n = [];
                                              e.forEach(function (e) {
                                                  n.push.apply(n, e);
                                              }),
                                                  t(
                                                      n
                                                          .filter(function (e) {
                                                              return e;
                                                          })
                                                          .map(function (e) {
                                                              return (
                                                                  e._relativePath ||
                                                                      (e._relativePath =
                                                                          e.webkitRelativePath),
                                                                  e
                                                              );
                                                          })
                                                  );
                                          })
                                          .catch(console.error)
                                    : t(e.files ? Array.from(e.files) : []);
                            });
                        },
                        Ui = function (e) {
                            if (Yi(e)) {
                                var t = zi(e);
                                if (t) return t.isFile || t.isDirectory;
                            }
                            return "file" === e.kind;
                        },
                        Bi = function (e) {
                            return new Promise(function (t, n) {
                                ki(e)
                                    ? Vi(zi(e)).then(t).catch(n)
                                    : t([e.getAsFile()]);
                            });
                        },
                        Vi = function (e) {
                            return new Promise(function (t, n) {
                                var r = [],
                                    i = 0,
                                    o = 0,
                                    a = function () {
                                        0 === o && 0 === i && t(r);
                                    },
                                    s = function e(t) {
                                        i++;
                                        var s = t.createReader(),
                                            u = function t() {
                                                s.readEntries(function (n) {
                                                    if (0 === n.length)
                                                        return i--, void a();
                                                    n.forEach(function (t) {
                                                        t.isDirectory
                                                            ? e(t)
                                                            : (o++,
                                                              t.file(function (
                                                                  e
                                                              ) {
                                                                  var n = qi(e);
                                                                  t.fullPath &&
                                                                      (n._relativePath =
                                                                          t.fullPath),
                                                                      r.push(n),
                                                                      o--,
                                                                      a();
                                                              }));
                                                    }),
                                                        t();
                                                }, n);
                                            };
                                        u();
                                    };
                                s(e);
                            });
                        },
                        qi = function (e) {
                            if (e.type.length) return e;
                            var t = e.lastModifiedDate,
                                n = e.name,
                                r = Ni(Tt(e.name));
                            return r.length
                                ? (((e = e.slice(0, e.size, r)).name = n),
                                  (e.lastModifiedDate = t),
                                  e)
                                : e;
                        },
                        ki = function (e) {
                            return Yi(e) && (zi(e) || {}).isDirectory;
                        },
                        Yi = function (e) {
                            return "webkitGetAsEntry" in e;
                        },
                        zi = function (e) {
                            return e.webkitGetAsEntry();
                        },
                        Wi = function (e) {
                            var t = [];
                            try {
                                if ((t = Hi(e)).length) return t;
                                t = ji(e);
                            } catch (e) {}
                            return t;
                        },
                        ji = function (e) {
                            var t = e.getData("url");
                            return "string" == typeof t && t.length ? [t] : [];
                        },
                        Hi = function (e) {
                            var t = e.getData("text/html");
                            if ("string" == typeof t && t.length) {
                                var n = t.match(/src\s*=\s*"(.+?)"/);
                                if (n) return [n[1]];
                            }
                            return [];
                        },
                        Xi = [],
                        Zi = function (e) {
                            return {
                                pageLeft: e.pageX,
                                pageTop: e.pageY,
                                scopeLeft: e.offsetX || e.layerX,
                                scopeTop: e.offsetY || e.layerY,
                            };
                        },
                        Qi = function (e, t, n) {
                            var r = Ki(t),
                                i = {
                                    element: e,
                                    filterElement: n,
                                    state: null,
                                    ondrop: function () {},
                                    onenter: function () {},
                                    ondrag: function () {},
                                    onexit: function () {},
                                    onload: function () {},
                                    allowdrop: function () {},
                                };
                            return (i.destroy = r.addListener(i)), i;
                        },
                        Ki = function (e) {
                            var t = Xi.find(function (t) {
                                return t.element === e;
                            });
                            if (t) return t;
                            var n = $i(e);
                            return Xi.push(n), n;
                        },
                        $i = function (e) {
                            var t = [],
                                n = {
                                    dragenter: ro,
                                    dragover: io,
                                    dragleave: ao,
                                    drop: oo,
                                },
                                r = {};
                            i(n, function (n, i) {
                                (r[n] = i(e, t)),
                                    e.addEventListener(n, r[n], !1);
                            });
                            var o = {
                                element: e,
                                addListener: function (a) {
                                    return (
                                        t.push(a),
                                        function () {
                                            t.splice(t.indexOf(a), 1),
                                                0 === t.length &&
                                                    (Xi.splice(
                                                        Xi.indexOf(o),
                                                        1
                                                    ),
                                                    i(n, function (t) {
                                                        e.removeEventListener(
                                                            t,
                                                            r[t],
                                                            !1
                                                        );
                                                    }));
                                        }
                                    );
                                },
                            };
                            return o;
                        },
                        Ji = function (e, t) {
                            return (
                                "elementFromPoint" in e || (e = document),
                                e.elementFromPoint(t.x, t.y)
                            );
                        },
                        eo = function (e, t) {
                            var n = Mi(t),
                                r = Ji(n, {
                                    x: e.pageX - window.pageXOffset,
                                    y: e.pageY - window.pageYOffset,
                                });
                            return r === t || t.contains(r);
                        },
                        to = null,
                        no = function (e, t) {
                            try {
                                e.dropEffect = t;
                            } catch (e) {}
                        },
                        ro = function (e, t) {
                            return function (e) {
                                e.preventDefault(),
                                    (to = e.target),
                                    t.forEach(function (t) {
                                        var n = t.element,
                                            r = t.onenter;
                                        eo(e, n) &&
                                            ((t.state = "enter"), r(Zi(e)));
                                    });
                            };
                        },
                        io = function (e, t) {
                            return function (e) {
                                e.preventDefault();
                                var n = e.dataTransfer;
                                Gi(n).then(function (r) {
                                    var i = !1;
                                    t.some(function (t) {
                                        var o = t.filterElement,
                                            a = t.element,
                                            s = t.onenter,
                                            u = t.onexit,
                                            l = t.ondrag,
                                            c = t.allowdrop;
                                        no(n, "copy");
                                        var f = c(r);
                                        if (f)
                                            if (eo(e, a)) {
                                                if (
                                                    ((i = !0), null === t.state)
                                                )
                                                    return (
                                                        (t.state = "enter"),
                                                        void s(Zi(e))
                                                    );
                                                if (
                                                    ((t.state = "over"),
                                                    o && !f)
                                                )
                                                    return void no(n, "none");
                                                l(Zi(e));
                                            } else
                                                o && !i && no(n, "none"),
                                                    t.state &&
                                                        ((t.state = null),
                                                        u(Zi(e)));
                                        else no(n, "none");
                                    });
                                });
                            };
                        },
                        oo = function (e, t) {
                            return function (e) {
                                e.preventDefault();
                                var n = e.dataTransfer;
                                Gi(n).then(function (n) {
                                    t.forEach(function (t) {
                                        var r = t.filterElement,
                                            i = t.element,
                                            o = t.ondrop,
                                            a = t.onexit,
                                            s = t.allowdrop;
                                        if (((t.state = null), !r || eo(e, i)))
                                            return s(n)
                                                ? void o(Zi(e), n)
                                                : a(Zi(e));
                                    });
                                });
                            };
                        },
                        ao = function (e, t) {
                            return function (e) {
                                to === e.target &&
                                    t.forEach(function (t) {
                                        var n = t.onexit;
                                        (t.state = null), n(Zi(e));
                                    });
                            };
                        },
                        so = function (e, t, n) {
                            e.classList.add("filepond--hopper");
                            var r = n.catchesDropsOnPage,
                                i = n.requiresDropOnElement,
                                o = n.filterItems,
                                a =
                                    void 0 === o
                                        ? function (e) {
                                              return e;
                                          }
                                        : o,
                                s = Qi(e, r ? document.documentElement : e, i),
                                u = "",
                                l = "";
                            (s.allowdrop = function (e) {
                                return t(a(e));
                            }),
                                (s.ondrop = function (e, n) {
                                    var r = a(n);
                                    t(r)
                                        ? ((l = "drag-drop"), c.onload(r, e))
                                        : c.ondragend(e);
                                }),
                                (s.ondrag = function (e) {
                                    c.ondrag(e);
                                }),
                                (s.onenter = function (e) {
                                    (l = "drag-over"), c.ondragstart(e);
                                }),
                                (s.onexit = function (e) {
                                    (l = "drag-exit"), c.ondragend(e);
                                });
                            var c = {
                                updateHopperState: function () {
                                    u !== l &&
                                        ((e.dataset.hopperState = l), (u = l));
                                },
                                onload: function () {},
                                ondragstart: function () {},
                                ondrag: function () {},
                                ondragend: function () {},
                                destroy: function () {
                                    s.destroy();
                                },
                            };
                            return c;
                        },
                        uo = !1,
                        lo = [],
                        co = function (e) {
                            var t = document.activeElement;
                            if (t && /textarea|input/i.test(t.nodeName)) {
                                for (var n = !1, r = t; r !== document.body; ) {
                                    if (
                                        r.classList.contains("filepond--root")
                                    ) {
                                        n = !0;
                                        break;
                                    }
                                    r = r.parentNode;
                                }
                                if (!n) return;
                            }
                            Gi(e.clipboardData).then(function (e) {
                                e.length &&
                                    lo.forEach(function (t) {
                                        return t(e);
                                    });
                            });
                        },
                        fo = function (e) {
                            lo.includes(e) ||
                                (lo.push(e),
                                uo ||
                                    ((uo = !0),
                                    document.addEventListener("paste", co)));
                        },
                        po = function (e) {
                            Ce(lo, lo.indexOf(e)),
                                0 === lo.length &&
                                    (document.removeEventListener("paste", co),
                                    (uo = !1));
                        },
                        Eo = function () {
                            var e = function (e) {
                                    t.onload(e);
                                },
                                t = {
                                    destroy: function () {
                                        po(e);
                                    },
                                    onload: function () {},
                                };
                            return fo(e), t;
                        },
                        ho = function (e) {
                            var t = e.root,
                                n = e.props;
                            (t.element.id = "filepond--assistant-" + n.id),
                                a(t.element, "role", "status"),
                                a(t.element, "aria-live", "polite"),
                                a(t.element, "aria-relevant", "additions");
                        },
                        _o = null,
                        mo = null,
                        go = [],
                        Io = function (e, t) {
                            e.element.textContent = t;
                        },
                        To = function (e) {
                            e.element.textContent = "";
                        },
                        vo = function (e, t, n) {
                            var r = e.query("GET_TOTAL_ITEMS");
                            Io(
                                e,
                                n +
                                    " " +
                                    t +
                                    ", " +
                                    r +
                                    " " +
                                    (1 === r
                                        ? e.query(
                                              "GET_LABEL_FILE_COUNT_SINGULAR"
                                          )
                                        : e.query(
                                              "GET_LABEL_FILE_COUNT_PLURAL"
                                          ))
                            ),
                                clearTimeout(mo),
                                (mo = setTimeout(function () {
                                    To(e);
                                }, 1500));
                        },
                        yo = function (e) {
                            return e.element.parentNode.contains(
                                document.activeElement
                            );
                        },
                        Ro = function (e) {
                            var t = e.root,
                                n = e.action;
                            if (yo(t)) {
                                t.element.textContent = "";
                                var r = t.query("GET_ITEM", n.id);
                                go.push(r.filename),
                                    clearTimeout(_o),
                                    (_o = setTimeout(function () {
                                        vo(
                                            t,
                                            go.join(", "),
                                            t.query("GET_LABEL_FILE_ADDED")
                                        ),
                                            (go.length = 0);
                                    }, 750));
                            }
                        },
                        Oo = function (e) {
                            var t = e.root,
                                n = e.action;
                            if (yo(t)) {
                                var r = n.item;
                                vo(
                                    t,
                                    r.filename,
                                    t.query("GET_LABEL_FILE_REMOVED")
                                );
                            }
                        },
                        Ao = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = t.query("GET_ITEM", n.id).filename,
                                i = t.query(
                                    "GET_LABEL_FILE_PROCESSING_COMPLETE"
                                );
                            Io(t, r + " " + i);
                        },
                        Do = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = t.query("GET_ITEM", n.id).filename,
                                i = t.query(
                                    "GET_LABEL_FILE_PROCESSING_ABORTED"
                                );
                            Io(t, r + " " + i);
                        },
                        So = function (e) {
                            var t = e.root,
                                n = e.action,
                                r = t.query("GET_ITEM", n.id).filename;
                            Io(t, n.status.main + " " + r + " " + n.status.sub);
                        },
                        wo = B({
                            create: ho,
                            ignoreRect: !0,
                            ignoreRectUpdate: !0,
                            write: q({
                                DID_LOAD_ITEM: Ro,
                                DID_REMOVE_ITEM: Oo,
                                DID_COMPLETE_ITEM_PROCESSING: Ao,
                                DID_ABORT_ITEM_PROCESSING: Do,
                                DID_REVERT_ITEM_PROCESSING: Do,
                                DID_THROW_ITEM_REMOVE_ERROR: So,
                                DID_THROW_ITEM_LOAD_ERROR: So,
                                DID_THROW_ITEM_INVALID: So,
                                DID_THROW_ITEM_PROCESSING_ERROR: So,
                            }),
                            tag: "span",
                            name: "assistant",
                        }),
                        Lo = function (e) {
                            var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : "-";
                            return e.replace(
                                new RegExp(t + ".", "g"),
                                function (e) {
                                    return e.charAt(1).toUpperCase();
                                }
                            );
                        },
                        Mo = function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 16,
                                n =
                                    !(
                                        arguments.length > 2 &&
                                        void 0 !== arguments[2]
                                    ) || arguments[2],
                                r = Date.now(),
                                i = null;
                            return function () {
                                for (
                                    var o = arguments.length,
                                        a = new Array(o),
                                        s = 0;
                                    s < o;
                                    s++
                                )
                                    a[s] = arguments[s];
                                clearTimeout(i);
                                var u = Date.now() - r,
                                    l = function () {
                                        (r = Date.now()), e.apply(void 0, a);
                                    };
                                u < t ? n || (i = setTimeout(l, t - u)) : l();
                            };
                        },
                        Po = 1e6,
                        bo = function (e) {
                            return e.preventDefault();
                        },
                        Co = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = t.query("GET_ID");
                            r && (t.element.id = r);
                            var i = t.query("GET_CLASS_NAME");
                            i &&
                                i
                                    .split(" ")
                                    .filter(function (e) {
                                        return e.length;
                                    })
                                    .forEach(function (e) {
                                        t.element.classList.add(e);
                                    }),
                                (t.ref.label = t.appendChildView(
                                    t.createChildView(
                                        ui,
                                        Object.assign({}, n, {
                                            translateY: null,
                                            caption: t.query("GET_LABEL_IDLE"),
                                        })
                                    )
                                )),
                                (t.ref.list = t.appendChildView(
                                    t.createChildView(jr, { translateY: null })
                                )),
                                (t.ref.panel = t.appendChildView(
                                    t.createChildView(gr, {
                                        name: "panel-root",
                                    })
                                )),
                                (t.ref.assistant = t.appendChildView(
                                    t.createChildView(wo, Object.assign({}, n))
                                )),
                                (t.ref.data = t.appendChildView(
                                    t.createChildView(Li, Object.assign({}, n))
                                )),
                                (t.ref.measure = In("div")),
                                (t.ref.measure.style.height = "100%"),
                                t.element.appendChild(t.ref.measure),
                                (t.ref.bounds = null),
                                t
                                    .query("GET_STYLES")
                                    .filter(function (e) {
                                        return !W(e.value);
                                    })
                                    .map(function (e) {
                                        var n = e.name,
                                            r = e.value;
                                        t.element.dataset[n] = r;
                                    }),
                                (t.ref.widthPrevious = null),
                                (t.ref.widthUpdated = Mo(function () {
                                    (t.ref.updateHistory = []),
                                        t.dispatch("DID_RESIZE_ROOT");
                                }, 250)),
                                (t.ref.previousAspectRatio = null),
                                (t.ref.updateHistory = []);
                            var o = window.matchMedia(
                                    "(pointer: fine) and (hover: hover)"
                                ).matches,
                                a = "PointerEvent" in window;
                            t.query("GET_ALLOW_REORDER") &&
                                a &&
                                !o &&
                                (t.element.addEventListener("touchmove", bo, {
                                    passive: !1,
                                }),
                                t.element.addEventListener("gesturestart", bo));
                            var s = t.query("GET_CREDITS");
                            if (2 === s.length) {
                                var u = document.createElement("a");
                                (u.className = "filepond--credits"),
                                    u.setAttribute("aria-hidden", "true"),
                                    (u.href = s[0]),
                                    (u.tabindex = -1),
                                    (u.target = "_blank"),
                                    (u.rel = "noopener noreferrer"),
                                    (u.textContent = s[1]),
                                    t.element.appendChild(u),
                                    (t.ref.credits = u);
                            }
                        },
                        No = function (e) {
                            var t = e.root,
                                n = e.props,
                                r = e.actions;
                            if (
                                (Yo({ root: t, props: n, actions: r }),
                                r
                                    .filter(function (e) {
                                        return /^DID_SET_STYLE_/.test(e.type);
                                    })
                                    .filter(function (e) {
                                        return !W(e.data.value);
                                    })
                                    .map(function (e) {
                                        var n = e.type,
                                            r = e.data,
                                            i = Lo(
                                                n.substr(8).toLowerCase(),
                                                "_"
                                            );
                                        (t.element.dataset[i] = r.value),
                                            t.invalidateLayout();
                                    }),
                                !t.rect.element.hidden)
                            ) {
                                t.rect.element.width !== t.ref.widthPrevious &&
                                    ((t.ref.widthPrevious =
                                        t.rect.element.width),
                                    t.ref.widthUpdated());
                                var i = t.ref.bounds;
                                i ||
                                    ((i = t.ref.bounds = Fo(t)),
                                    t.element.removeChild(t.ref.measure),
                                    (t.ref.measure = null));
                                var o = t.ref,
                                    a = o.hopper,
                                    s = o.label,
                                    u = o.list,
                                    l = o.panel;
                                a && a.updateHopperState();
                                var c = t.query("GET_PANEL_ASPECT_RATIO"),
                                    f = t.query("GET_ALLOW_MULTIPLE"),
                                    d = t.query("GET_TOTAL_ITEMS"),
                                    p =
                                        d ===
                                        (f
                                            ? t.query("GET_MAX_FILES") || Po
                                            : 1),
                                    E = r.find(function (e) {
                                        return "DID_ADD_ITEM" === e.type;
                                    });
                                if (p && E) {
                                    var h = E.data.interactionMethod;
                                    (s.opacity = 0),
                                        f
                                            ? (s.translateY = -40)
                                            : h === Re.API
                                            ? (s.translateX = 40)
                                            : h === Re.BROWSE
                                            ? (s.translateY = 40)
                                            : (s.translateY = 30);
                                } else
                                    p ||
                                        ((s.opacity = 1),
                                        (s.translateX = 0),
                                        (s.translateY = 0));
                                var _ = Go(t),
                                    m = xo(t),
                                    g = s.rect.element.height,
                                    I = !f || p ? 0 : g,
                                    T = p ? u.rect.element.marginTop : 0,
                                    v =
                                        0 === d
                                            ? 0
                                            : u.rect.element.marginBottom,
                                    y = I + T + m.visual + v,
                                    R = I + T + m.bounds + v;
                                if (
                                    ((u.translateY =
                                        Math.max(
                                            0,
                                            I - u.rect.element.marginTop
                                        ) - _.top),
                                    c)
                                ) {
                                    var O = t.rect.element.width,
                                        A = O * c;
                                    c !== t.ref.previousAspectRatio &&
                                        ((t.ref.previousAspectRatio = c),
                                        (t.ref.updateHistory = []));
                                    var D = t.ref.updateHistory;
                                    D.push(O);
                                    var S = 2;
                                    if (D.length > 2 * S)
                                        for (
                                            var w = D.length,
                                                L = w - 10,
                                                M = 0,
                                                P = w;
                                            P >= L;
                                            P--
                                        )
                                            if (
                                                (D[P] === D[P - 2] && M++,
                                                M >= S)
                                            )
                                                return;
                                    (l.scalable = !1), (l.height = A);
                                    var b =
                                        A - I - (v - _.bottom) - (p ? T : 0);
                                    m.visual > b
                                        ? (u.overflow = b)
                                        : (u.overflow = null),
                                        (t.height = A);
                                } else if (i.fixedHeight) {
                                    l.scalable = !1;
                                    var C =
                                        i.fixedHeight -
                                        I -
                                        (v - _.bottom) -
                                        (p ? T : 0);
                                    m.visual > C
                                        ? (u.overflow = C)
                                        : (u.overflow = null);
                                } else if (i.cappedHeight) {
                                    var N = y >= i.cappedHeight,
                                        G = Math.min(i.cappedHeight, y);
                                    (l.scalable = !0),
                                        (l.height = N
                                            ? G
                                            : G - _.top - _.bottom);
                                    var x =
                                        G - I - (v - _.bottom) - (p ? T : 0);
                                    y > i.cappedHeight && m.visual > x
                                        ? (u.overflow = x)
                                        : (u.overflow = null),
                                        (t.height = Math.min(
                                            i.cappedHeight,
                                            R - _.top - _.bottom
                                        ));
                                } else {
                                    var F = d > 0 ? _.top + _.bottom : 0;
                                    (l.scalable = !0),
                                        (l.height = Math.max(g, y - F)),
                                        (t.height = Math.max(g, R - F));
                                }
                                t.ref.credits &&
                                    l.heightCurrent &&
                                    (t.ref.credits.style.transform =
                                        "translateY(" +
                                        l.heightCurrent +
                                        "px)");
                            }
                        },
                        Go = function (e) {
                            var t = e.ref.list.childViews[0].childViews[0];
                            return t
                                ? {
                                      top: t.rect.element.marginTop,
                                      bottom: t.rect.element.marginBottom,
                                  }
                                : { top: 0, bottom: 0 };
                        },
                        xo = function (e) {
                            var t = 0,
                                n = 0,
                                r = e.ref.list,
                                i = r.childViews[0],
                                o = i.childViews.filter(function (e) {
                                    return e.rect.element.height;
                                }),
                                a = e
                                    .query("GET_ACTIVE_ITEMS")
                                    .map(function (e) {
                                        return o.find(function (t) {
                                            return t.id === e.id;
                                        });
                                    })
                                    .filter(function (e) {
                                        return e;
                                    });
                            if (0 === a.length) return { visual: t, bounds: n };
                            var s = i.rect.element.width,
                                u = wr(i, a, r.dragCoordinates),
                                l = a[0].rect.element,
                                c = l.marginTop + l.marginBottom,
                                f = l.marginLeft + l.marginRight,
                                d = l.width + f,
                                p = l.height + c,
                                E = void 0 !== u && u >= 0 ? 1 : 0,
                                h = a.find(function (e) {
                                    return (
                                        e.markedForRemoval && e.opacity < 0.45
                                    );
                                })
                                    ? -1
                                    : 0,
                                _ = a.length + E + h,
                                m = Sr(s, d);
                            return (
                                1 === m
                                    ? a.forEach(function (e) {
                                          var r = e.rect.element.height + c;
                                          (n += r), (t += r * e.opacity);
                                      })
                                    : ((n = Math.ceil(_ / m) * p), (t = n)),
                                { visual: t, bounds: n }
                            );
                        },
                        Fo = function (e) {
                            var t = e.ref.measureHeight || null;
                            return {
                                cappedHeight:
                                    parseInt(e.style.maxHeight, 10) || null,
                                fixedHeight: 0 === t ? null : t,
                            };
                        },
                        Uo = function (e, t) {
                            var n = e.query("GET_ALLOW_REPLACE"),
                                r = e.query("GET_ALLOW_MULTIPLE"),
                                i = e.query("GET_TOTAL_ITEMS"),
                                o = e.query("GET_MAX_FILES"),
                                a = t.length;
                            return (
                                (!r && a > 1) ||
                                (!!(te((o = r || n ? o : 1)) && i + a > o) &&
                                    (e.dispatch("DID_THROW_MAX_FILES", {
                                        source: t,
                                        error: Vt("warning", 0, "Max files"),
                                    }),
                                    !0))
                            );
                        },
                        Bo = function (e, t, n) {
                            var r = e.childViews[0];
                            return wr(r, t, {
                                left: n.scopeLeft - r.rect.element.left,
                                top:
                                    n.scopeTop -
                                    (e.rect.outer.top +
                                        e.rect.element.marginTop +
                                        e.rect.element.scrollTop),
                            });
                        },
                        Vo = function (e) {
                            var t = e.query("GET_ALLOW_DROP"),
                                n = e.query("GET_DISABLED"),
                                r = t && !n;
                            if (r && !e.ref.hopper) {
                                var i = so(
                                    e.element,
                                    function (t) {
                                        var n =
                                            e.query("GET_BEFORE_DROP_FILE") ||
                                            function () {
                                                return !0;
                                            };
                                        return (
                                            !e.query("GET_DROP_VALIDATION") ||
                                            t.every(function (t) {
                                                return (
                                                    Xe("ALLOW_HOPPER_ITEM", t, {
                                                        query: e.query,
                                                    }).every(function (e) {
                                                        return !0 === e;
                                                    }) && n(t)
                                                );
                                            })
                                        );
                                    },
                                    {
                                        filterItems: function (t) {
                                            var n =
                                                e.query("GET_IGNORED_FILES");
                                            return t.filter(function (e) {
                                                return (
                                                    !tn(e) ||
                                                    !n.includes(
                                                        e.name.toLowerCase()
                                                    )
                                                );
                                            });
                                        },
                                        catchesDropsOnPage:
                                            e.query("GET_DROP_ON_PAGE"),
                                        requiresDropOnElement: e.query(
                                            "GET_DROP_ON_ELEMENT"
                                        ),
                                    }
                                );
                                (i.onload = function (t, n) {
                                    var r =
                                            e.ref.list.childViews[0].childViews.filter(
                                                function (e) {
                                                    return e.rect.element
                                                        .height;
                                                }
                                            ),
                                        i = e
                                            .query("GET_ACTIVE_ITEMS")
                                            .map(function (e) {
                                                return r.find(function (t) {
                                                    return t.id === e.id;
                                                });
                                            })
                                            .filter(function (e) {
                                                return e;
                                            });
                                    He("ADD_ITEMS", t, {
                                        dispatch: e.dispatch,
                                    }).then(function (t) {
                                        if (Uo(e, t)) return !1;
                                        e.dispatch("ADD_ITEMS", {
                                            items: t,
                                            index: Bo(e.ref.list, i, n),
                                            interactionMethod: Re.DROP,
                                        });
                                    }),
                                        e.dispatch("DID_DROP", { position: n }),
                                        e.dispatch("DID_END_DRAG", {
                                            position: n,
                                        });
                                }),
                                    (i.ondragstart = function (t) {
                                        e.dispatch("DID_START_DRAG", {
                                            position: t,
                                        });
                                    }),
                                    (i.ondrag = Mo(function (t) {
                                        e.dispatch("DID_DRAG", { position: t });
                                    })),
                                    (i.ondragend = function (t) {
                                        e.dispatch("DID_END_DRAG", {
                                            position: t,
                                        });
                                    }),
                                    (e.ref.hopper = i),
                                    (e.ref.drip = e.appendChildView(
                                        e.createChildView(_i)
                                    ));
                            } else
                                !r &&
                                    e.ref.hopper &&
                                    (e.ref.hopper.destroy(),
                                    (e.ref.hopper = null),
                                    e.removeChildView(e.ref.drip));
                        },
                        qo = function (e, t) {
                            var n = e.query("GET_ALLOW_BROWSE"),
                                r = e.query("GET_DISABLED"),
                                i = n && !r;
                            i && !e.ref.browser
                                ? (e.ref.browser = e.appendChildView(
                                      e.createChildView(
                                          ii,
                                          Object.assign({}, t, {
                                              onload: function (t) {
                                                  He("ADD_ITEMS", t, {
                                                      dispatch: e.dispatch,
                                                  }).then(function (t) {
                                                      if (Uo(e, t)) return !1;
                                                      e.dispatch("ADD_ITEMS", {
                                                          items: t,
                                                          index: -1,
                                                          interactionMethod:
                                                              Re.BROWSE,
                                                      });
                                                  });
                                              },
                                          })
                                      ),
                                      0
                                  ))
                                : !i &&
                                  e.ref.browser &&
                                  (e.removeChildView(e.ref.browser),
                                  (e.ref.browser = null));
                        },
                        ko = function (e) {
                            var t = e.query("GET_ALLOW_PASTE"),
                                n = e.query("GET_DISABLED"),
                                r = t && !n;
                            r && !e.ref.paster
                                ? ((e.ref.paster = Eo()),
                                  (e.ref.paster.onload = function (t) {
                                      He("ADD_ITEMS", t, {
                                          dispatch: e.dispatch,
                                      }).then(function (t) {
                                          if (Uo(e, t)) return !1;
                                          e.dispatch("ADD_ITEMS", {
                                              items: t,
                                              index: -1,
                                              interactionMethod: Re.PASTE,
                                          });
                                      });
                                  }))
                                : !r &&
                                  e.ref.paster &&
                                  (e.ref.paster.destroy(),
                                  (e.ref.paster = null));
                        },
                        Yo = q({
                            DID_SET_ALLOW_BROWSE: function (e) {
                                var t = e.root,
                                    n = e.props;
                                qo(t, n);
                            },
                            DID_SET_ALLOW_DROP: function (e) {
                                var t = e.root;
                                Vo(t);
                            },
                            DID_SET_ALLOW_PASTE: function (e) {
                                var t = e.root;
                                ko(t);
                            },
                            DID_SET_DISABLED: function (e) {
                                var t = e.root,
                                    n = e.props;
                                Vo(t),
                                    ko(t),
                                    qo(t, n),
                                    t.query("GET_DISABLED")
                                        ? (t.element.dataset.disabled =
                                              "disabled")
                                        : t.element.removeAttribute(
                                              "data-disabled"
                                          );
                            },
                        }),
                        zo = B({
                            name: "root",
                            read: function (e) {
                                var t = e.root;
                                t.ref.measure &&
                                    (t.ref.measureHeight =
                                        t.ref.measure.offsetHeight);
                            },
                            create: Co,
                            write: No,
                            destroy: function (e) {
                                var t = e.root;
                                t.ref.paster && t.ref.paster.destroy(),
                                    t.ref.hopper && t.ref.hopper.destroy(),
                                    t.element.removeEventListener(
                                        "touchmove",
                                        bo
                                    ),
                                    t.element.removeEventListener(
                                        "gesturestart",
                                        bo
                                    );
                            },
                            mixins: { styles: ["height"] },
                        }),
                        Wo = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                t = null,
                                r = Ke(),
                                i = n(ge(r), [pt, ye(r)], [_n, ve(r)]);
                            i.dispatch("SET_OPTIONS", { options: e });
                            var a = function () {
                                document.hidden || i.dispatch("KICK");
                            };
                            document.addEventListener("visibilitychange", a);
                            var s = null,
                                u = !1,
                                l = !1,
                                c = null,
                                f = null,
                                d = function () {
                                    u || (u = !0),
                                        clearTimeout(s),
                                        (s = setTimeout(function () {
                                            (u = !1),
                                                (c = null),
                                                (f = null),
                                                l &&
                                                    ((l = !1),
                                                    i.dispatch(
                                                        "DID_STOP_RESIZE"
                                                    ));
                                        }, 500));
                                };
                            window.addEventListener("resize", d);
                            var p = zo(i, { id: Oe() }),
                                E = !1,
                                h = !1,
                                _ = {
                                    _read: function () {
                                        u &&
                                            ((f = window.innerWidth),
                                            c || (c = f),
                                            l ||
                                                f === c ||
                                                (i.dispatch("DID_START_RESIZE"),
                                                (l = !0))),
                                            h &&
                                                E &&
                                                (E =
                                                    null ===
                                                    p.element.offsetParent),
                                            E ||
                                                (p._read(),
                                                (h = p.rect.element.hidden));
                                    },
                                    _write: function (e) {
                                        var t = i
                                            .processActionQueue()
                                            .filter(function (e) {
                                                return !/^SET_/.test(e.type);
                                            });
                                        (E && !t.length) ||
                                            (v(t),
                                            (E = p._write(e, t, l)),
                                            Be(i.query("GET_ITEMS")),
                                            E && i.processDispatchQueue());
                                    },
                                },
                                m = function (e) {
                                    return function (t) {
                                        var n = { type: e };
                                        if (!t) return n;
                                        if (
                                            (t.hasOwnProperty("error") &&
                                                (n.error = t.error
                                                    ? Object.assign({}, t.error)
                                                    : null),
                                            t.status &&
                                                (n.status = Object.assign(
                                                    {},
                                                    t.status
                                                )),
                                            t.file && (n.output = t.file),
                                            t.source)
                                        )
                                            n.file = t.source;
                                        else if (t.item || t.id) {
                                            var r = t.item
                                                ? t.item
                                                : i.query("GET_ITEM", t.id);
                                            n.file = r ? Ue(r) : null;
                                        }
                                        return (
                                            t.items &&
                                                (n.items = t.items.map(Ue)),
                                            /progress/.test(e) &&
                                                (n.progress = t.progress),
                                            t.hasOwnProperty("origin") &&
                                                t.hasOwnProperty("target") &&
                                                ((n.origin = t.origin),
                                                (n.target = t.target)),
                                            n
                                        );
                                    };
                                },
                                g = {
                                    DID_DESTROY: m("destroy"),
                                    DID_INIT: m("init"),
                                    DID_THROW_MAX_FILES: m("warning"),
                                    DID_INIT_ITEM: m("initfile"),
                                    DID_START_ITEM_LOAD: m("addfilestart"),
                                    DID_UPDATE_ITEM_LOAD_PROGRESS:
                                        m("addfileprogress"),
                                    DID_LOAD_ITEM: m("addfile"),
                                    DID_THROW_ITEM_INVALID: [
                                        m("error"),
                                        m("addfile"),
                                    ],
                                    DID_THROW_ITEM_LOAD_ERROR: [
                                        m("error"),
                                        m("addfile"),
                                    ],
                                    DID_THROW_ITEM_REMOVE_ERROR: [
                                        m("error"),
                                        m("removefile"),
                                    ],
                                    DID_PREPARE_OUTPUT: m("preparefile"),
                                    DID_START_ITEM_PROCESSING:
                                        m("processfilestart"),
                                    DID_UPDATE_ITEM_PROCESS_PROGRESS: m(
                                        "processfileprogress"
                                    ),
                                    DID_ABORT_ITEM_PROCESSING:
                                        m("processfileabort"),
                                    DID_COMPLETE_ITEM_PROCESSING:
                                        m("processfile"),
                                    DID_COMPLETE_ITEM_PROCESSING_ALL:
                                        m("processfiles"),
                                    DID_REVERT_ITEM_PROCESSING:
                                        m("processfilerevert"),
                                    DID_THROW_ITEM_PROCESSING_ERROR: [
                                        m("error"),
                                        m("processfile"),
                                    ],
                                    DID_REMOVE_ITEM: m("removefile"),
                                    DID_UPDATE_ITEMS: m("updatefiles"),
                                    DID_ACTIVATE_ITEM: m("activatefile"),
                                    DID_REORDER_ITEMS: m("reorderfiles"),
                                },
                                I = function (e) {
                                    var t = Object.assign({ pond: N }, e);
                                    delete t.type,
                                        p.element.dispatchEvent(
                                            new CustomEvent(
                                                "FilePond:" + e.type,
                                                {
                                                    detail: t,
                                                    bubbles: !0,
                                                    cancelable: !0,
                                                    composed: !0,
                                                }
                                            )
                                        );
                                    var n = [];
                                    e.hasOwnProperty("error") &&
                                        n.push(e.error),
                                        e.hasOwnProperty("file") &&
                                            n.push(e.file);
                                    var r = ["type", "error", "file"];
                                    Object.keys(e)
                                        .filter(function (e) {
                                            return !r.includes(e);
                                        })
                                        .forEach(function (t) {
                                            return n.push(e[t]);
                                        }),
                                        N.fire.apply(N, [e.type].concat(n));
                                    var o = i.query(
                                        "GET_ON" + e.type.toUpperCase()
                                    );
                                    o && o.apply(void 0, n);
                                },
                                v = function (e) {
                                    e.length &&
                                        e
                                            .filter(function (e) {
                                                return g[e.type];
                                            })
                                            .forEach(function (e) {
                                                var t = g[e.type];
                                                (Array.isArray(t)
                                                    ? t
                                                    : [t]
                                                ).forEach(function (t) {
                                                    "DID_INIT_ITEM" === e.type
                                                        ? I(t(e.data))
                                                        : setTimeout(
                                                              function () {
                                                                  I(t(e.data));
                                                              },
                                                              0
                                                          );
                                                });
                                            });
                                },
                                y = function (e) {
                                    return i.dispatch("SET_OPTIONS", {
                                        options: e,
                                    });
                                },
                                R = function (e) {
                                    return i.query("GET_ACTIVE_ITEM", e);
                                },
                                O = function (e) {
                                    return new Promise(function (t, n) {
                                        i.dispatch("REQUEST_ITEM_PREPARE", {
                                            query: e,
                                            success: function (e) {
                                                t(e);
                                            },
                                            failure: function (e) {
                                                n(e);
                                            },
                                        });
                                    });
                                },
                                A = function (e) {
                                    var t =
                                        arguments.length > 1 &&
                                        void 0 !== arguments[1]
                                            ? arguments[1]
                                            : {};
                                    return new Promise(function (n, r) {
                                        w([{ source: e, options: t }], {
                                            index: t.index,
                                        })
                                            .then(function (e) {
                                                return n(e && e[0]);
                                            })
                                            .catch(r);
                                    });
                                },
                                D = function (e) {
                                    return e.file && e.id;
                                },
                                S = function (e, t) {
                                    return (
                                        "object" != typeof e ||
                                            D(e) ||
                                            t ||
                                            ((t = e), (e = void 0)),
                                        i.dispatch(
                                            "REMOVE_ITEM",
                                            Object.assign({}, t, { query: e })
                                        ),
                                        null === i.query("GET_ACTIVE_ITEM", e)
                                    );
                                },
                                w = function () {
                                    for (
                                        var e = arguments.length,
                                            t = new Array(e),
                                            n = 0;
                                        n < e;
                                        n++
                                    )
                                        t[n] = arguments[n];
                                    return new Promise(function (e, n) {
                                        var r = [],
                                            o = {};
                                        if (z(t[0]))
                                            r.push.apply(r, t[0]),
                                                Object.assign(o, t[1] || {});
                                        else {
                                            var a = t[t.length - 1];
                                            "object" != typeof a ||
                                                a instanceof Blob ||
                                                Object.assign(o, t.pop()),
                                                r.push.apply(r, t);
                                        }
                                        i.dispatch("ADD_ITEMS", {
                                            items: r,
                                            index: o.index,
                                            interactionMethod: Re.API,
                                            success: e,
                                            failure: n,
                                        });
                                    });
                                },
                                L = function () {
                                    return i.query("GET_ACTIVE_ITEMS");
                                },
                                M = function (e) {
                                    return new Promise(function (t, n) {
                                        i.dispatch("REQUEST_ITEM_PROCESSING", {
                                            query: e,
                                            success: function (e) {
                                                t(e);
                                            },
                                            failure: function (e) {
                                                n(e);
                                            },
                                        });
                                    });
                                },
                                P = function () {
                                    for (
                                        var e = arguments.length,
                                            t = new Array(e),
                                            n = 0;
                                        n < e;
                                        n++
                                    )
                                        t[n] = arguments[n];
                                    var r = Array.isArray(t[0]) ? t[0] : t,
                                        i = r.length ? r : L();
                                    return Promise.all(i.map(O));
                                },
                                b = function () {
                                    for (
                                        var e = arguments.length,
                                            t = new Array(e),
                                            n = 0;
                                        n < e;
                                        n++
                                    )
                                        t[n] = arguments[n];
                                    var r = Array.isArray(t[0]) ? t[0] : t;
                                    if (!r.length) {
                                        var i = L().filter(function (e) {
                                            return (
                                                !(
                                                    e.status === Ve.IDLE &&
                                                    e.origin === qe.LOCAL
                                                ) &&
                                                e.status !== Ve.PROCESSING &&
                                                e.status !==
                                                    Ve.PROCESSING_COMPLETE &&
                                                e.status !==
                                                    Ve.PROCESSING_REVERT_ERROR
                                            );
                                        });
                                        return Promise.all(i.map(M));
                                    }
                                    return Promise.all(r.map(M));
                                },
                                C = function () {
                                    for (
                                        var e = arguments.length,
                                            t = new Array(e),
                                            n = 0;
                                        n < e;
                                        n++
                                    )
                                        t[n] = arguments[n];
                                    var r,
                                        i = Array.isArray(t[0]) ? t[0] : t;
                                    "object" == typeof i[i.length - 1]
                                        ? (r = i.pop())
                                        : Array.isArray(t[0]) && (r = t[1]);
                                    var o = L();
                                    return i.length
                                        ? i
                                              .map(function (e) {
                                                  return T(e)
                                                      ? o[e]
                                                          ? o[e].id
                                                          : null
                                                      : e;
                                              })
                                              .filter(function (e) {
                                                  return e;
                                              })
                                              .map(function (e) {
                                                  return S(e, r);
                                              })
                                        : Promise.all(
                                              o.map(function (e) {
                                                  return S(e, r);
                                              })
                                          );
                                },
                                N = Object.assign(
                                    {},
                                    Ge(),
                                    {},
                                    _,
                                    {},
                                    Te(i, r),
                                    {
                                        setOptions: y,
                                        addFile: A,
                                        addFiles: w,
                                        getFile: R,
                                        processFile: M,
                                        prepareFile: O,
                                        removeFile: S,
                                        moveFile: function (e, t) {
                                            return i.dispatch("MOVE_ITEM", {
                                                query: e,
                                                index: t,
                                            });
                                        },
                                        getFiles: L,
                                        processFiles: b,
                                        removeFiles: C,
                                        prepareFiles: P,
                                        sort: function (e) {
                                            return i.dispatch("SORT", {
                                                compare: e,
                                            });
                                        },
                                        browse: function () {
                                            var e =
                                                p.element.querySelector(
                                                    "input[type=file]"
                                                );
                                            e && e.click();
                                        },
                                        destroy: function () {
                                            N.fire("destroy", p.element),
                                                i.dispatch("ABORT_ALL"),
                                                p._destroy(),
                                                window.removeEventListener(
                                                    "resize",
                                                    d
                                                ),
                                                document.removeEventListener(
                                                    "visibilitychange",
                                                    a
                                                ),
                                                i.dispatch("DID_DESTROY");
                                        },
                                        insertBefore: function (e) {
                                            return k(p.element, e);
                                        },
                                        insertAfter: function (e) {
                                            return Y(p.element, e);
                                        },
                                        appendTo: function (e) {
                                            return e.appendChild(p.element);
                                        },
                                        replaceElement: function (e) {
                                            k(p.element, e),
                                                e.parentNode.removeChild(e),
                                                (t = e);
                                        },
                                        restoreElement: function () {
                                            t &&
                                                (Y(t, p.element),
                                                p.element.parentNode.removeChild(
                                                    p.element
                                                ),
                                                (t = null));
                                        },
                                        isAttachedTo: function (e) {
                                            return p.element === e || t === e;
                                        },
                                        element: {
                                            get: function () {
                                                return p.element;
                                            },
                                        },
                                        status: {
                                            get: function () {
                                                return i.query("GET_STATUS");
                                            },
                                        },
                                    }
                                );
                            return i.dispatch("DID_INIT"), o(N);
                        },
                        jo = function () {
                            var e =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                t = {};
                            return (
                                i(Ke(), function (e, n) {
                                    t[e] = n[0];
                                }),
                                Wo(Object.assign({}, t, {}, e))
                            );
                        },
                        Ho = function (e) {
                            return e.charAt(0).toLowerCase() + e.slice(1);
                        },
                        Xo = function (e) {
                            return Lo(e.replace(/^data-/, ""));
                        },
                        Zo = function e(t, n) {
                            i(n, function (n, r) {
                                i(t, function (e, i) {
                                    var o = new RegExp(n);
                                    if (o.test(e) && (delete t[e], !1 !== r))
                                        if (K(r)) t[r] = i;
                                        else {
                                            var a = r.group;
                                            le(r) && !t[a] && (t[a] = {}),
                                                (t[a][Ho(e.replace(o, ""))] =
                                                    i);
                                        }
                                }),
                                    r.mapping && e(t[r.group], r.mapping);
                            });
                        },
                        Qo = function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {},
                                n = [];
                            i(e.attributes, function (t) {
                                n.push(e.attributes[t]);
                            });
                            var r = n
                                .filter(function (e) {
                                    return e.name;
                                })
                                .reduce(function (t, n) {
                                    var r = a(e, n.name);
                                    return (
                                        (t[Xo(n.name)] = r === n.name || r), t
                                    );
                                }, {});
                            return Zo(r, t), r;
                        },
                        Ko = function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {},
                                n = {
                                    "^class$": "className",
                                    "^multiple$": "allowMultiple",
                                    "^capture$": "captureMethod",
                                    "^webkitdirectory$": "allowDirectoriesOnly",
                                    "^server": {
                                        group: "server",
                                        mapping: {
                                            "^process": { group: "process" },
                                            "^revert": { group: "revert" },
                                            "^fetch": { group: "fetch" },
                                            "^restore": { group: "restore" },
                                            "^load": { group: "load" },
                                        },
                                    },
                                    "^type$": !1,
                                    "^files$": !1,
                                };
                            Xe("SET_ATTRIBUTE_TO_OPTION_MAP", n);
                            var r = Object.assign({}, t),
                                i = Qo(
                                    "FIELDSET" === e.nodeName
                                        ? e.querySelector("input[type=file]")
                                        : e,
                                    n
                                );
                            Object.keys(i).forEach(function (e) {
                                le(i[e])
                                    ? (le(r[e]) || (r[e] = {}),
                                      Object.assign(r[e], i[e]))
                                    : (r[e] = i[e]);
                            }),
                                (r.files = (t.files || []).concat(
                                    Array.from(
                                        e.querySelectorAll(
                                            "input:not([type=file])"
                                        )
                                    ).map(function (e) {
                                        return {
                                            source: e.value,
                                            options: { type: e.dataset.type },
                                        };
                                    })
                                ));
                            var o = jo(r);
                            return (
                                e.files &&
                                    Array.from(e.files).forEach(function (e) {
                                        o.addFile(e);
                                    }),
                                o.replaceElement(e),
                                o
                            );
                        },
                        $o = function () {
                            return t(
                                arguments.length <= 0 ? void 0 : arguments[0]
                            )
                                ? Ko.apply(void 0, arguments)
                                : jo.apply(void 0, arguments);
                        },
                        Jo = ["fire", "_read", "_write"],
                        ea = function (e) {
                            var t = {};
                            return xe(e, t, Jo), t;
                        },
                        ta = function (e, t) {
                            return e.replace(
                                /(?:{([a-zA-Z]+)})/g,
                                function (e, n) {
                                    return t[n];
                                }
                            );
                        },
                        na = function (e) {
                            var t = new Blob(["(", e.toString(), ")()"], {
                                    type: "application/javascript",
                                }),
                                n = URL.createObjectURL(t),
                                r = new Worker(n);
                            return {
                                transfer: function (e, t) {},
                                post: function (e, t, n) {
                                    var i = Oe();
                                    (r.onmessage = function (e) {
                                        e.data.id === i && t(e.data.message);
                                    }),
                                        r.postMessage({ id: i, message: e }, n);
                                },
                                terminate: function () {
                                    r.terminate(), URL.revokeObjectURL(n);
                                },
                            };
                        },
                        ra = function (e) {
                            return new Promise(function (t, n) {
                                var r = new Image();
                                (r.onload = function () {
                                    t(r);
                                }),
                                    (r.onerror = function (e) {
                                        n(e);
                                    }),
                                    (r.src = e);
                            });
                        },
                        ia = function (e, t) {
                            var n = e.slice(0, e.size, e.type);
                            return (
                                (n.lastModifiedDate = e.lastModifiedDate),
                                (n.name = t),
                                n
                            );
                        },
                        oa = function (e) {
                            return ia(e, e.name);
                        },
                        aa = [],
                        sa = function (e) {
                            if (!aa.includes(e)) {
                                aa.push(e);
                                var t = e({
                                    addFilter: Ze,
                                    utils: {
                                        Type: We,
                                        forin: i,
                                        isString: K,
                                        isFile: tn,
                                        toNaturalFileSize: Mn,
                                        replaceInString: ta,
                                        getExtensionFromFilename: Tt,
                                        getFilenameWithoutExtension: Jt,
                                        guesstimateMimeType: Ni,
                                        getFileFromBlob: Ot,
                                        getFilenameFromURL: It,
                                        createRoute: q,
                                        createWorker: na,
                                        createView: B,
                                        createItemAPI: Ue,
                                        loadImage: ra,
                                        copyFile: oa,
                                        renameFile: ia,
                                        createBlob: Dt,
                                        applyFilterChain: He,
                                        text: Tn,
                                        getNumericAspectRatioFromString: tt,
                                    },
                                    views: { fileActionButton: Ln },
                                });
                                Qe(t.options);
                            }
                        },
                        ua = function () {
                            return (
                                "[object OperaMini]" ===
                                Object.prototype.toString.call(window.operamini)
                            );
                        },
                        la = function () {
                            return "Promise" in window;
                        },
                        ca = function () {
                            return "slice" in Blob.prototype;
                        },
                        fa = function () {
                            return (
                                "URL" in window &&
                                "createObjectURL" in window.URL
                            );
                        },
                        da = function () {
                            return "visibilityState" in document;
                        },
                        pa = function () {
                            return "performance" in window;
                        },
                        Ea = function () {
                            return "supports" in (window.CSS || {});
                        },
                        ha = function () {
                            return /MSIE|Trident/.test(
                                window.navigator.userAgent
                            );
                        },
                        _a =
                            ((Xn =
                                h() &&
                                !ua() &&
                                da() &&
                                la() &&
                                ca() &&
                                fa() &&
                                pa() &&
                                (Ea() || ha())),
                            function () {
                                return Xn;
                            }),
                        ma = { apps: [] },
                        ga = "filepond",
                        Ia = function () {};
                    if (
                        ((e.Status = {}),
                        (e.FileStatus = {}),
                        (e.FileOrigin = {}),
                        (e.OptionTypes = {}),
                        (e.create = Ia),
                        (e.destroy = Ia),
                        (e.parse = Ia),
                        (e.find = Ia),
                        (e.registerPlugin = Ia),
                        (e.getOptions = Ia),
                        (e.setOptions = Ia),
                        _a())
                    ) {
                        V(
                            function () {
                                ma.apps.forEach(function (e) {
                                    return e._read();
                                });
                            },
                            function (e) {
                                ma.apps.forEach(function (t) {
                                    return t._write(e);
                                });
                            }
                        );
                        var Ta = function t() {
                            document.dispatchEvent(
                                new CustomEvent("FilePond:loaded", {
                                    detail: {
                                        supported: _a,
                                        create: e.create,
                                        destroy: e.destroy,
                                        parse: e.parse,
                                        find: e.find,
                                        registerPlugin: e.registerPlugin,
                                        setOptions: e.setOptions,
                                    },
                                })
                            ),
                                document.removeEventListener(
                                    "DOMContentLoaded",
                                    t
                                );
                        };
                        "loading" !== document.readyState
                            ? setTimeout(function () {
                                  return Ta();
                              }, 0)
                            : document.addEventListener("DOMContentLoaded", Ta);
                        var va = function () {
                            return i(Ke(), function (t, n) {
                                e.OptionTypes[t] = n[1];
                            });
                        };
                        (e.Status = Object.assign({}, rt)),
                            (e.FileOrigin = Object.assign({}, qe)),
                            (e.FileStatus = Object.assign({}, Ve)),
                            (e.OptionTypes = {}),
                            va(),
                            (e.create = function () {
                                var t = $o.apply(void 0, arguments);
                                return (
                                    t.on("destroy", e.destroy),
                                    ma.apps.push(t),
                                    ea(t)
                                );
                            }),
                            (e.destroy = function (e) {
                                var t = ma.apps.findIndex(function (t) {
                                    return t.isAttachedTo(e);
                                });
                                return (
                                    t >= 0 &&
                                    (ma.apps.splice(t, 1)[0].restoreElement(),
                                    !0)
                                );
                            }),
                            (e.parse = function (t) {
                                return Array.from(t.querySelectorAll("." + ga))
                                    .filter(function (e) {
                                        return !ma.apps.find(function (t) {
                                            return t.isAttachedTo(e);
                                        });
                                    })
                                    .map(function (t) {
                                        return e.create(t);
                                    });
                            }),
                            (e.find = function (e) {
                                var t = ma.apps.find(function (t) {
                                    return t.isAttachedTo(e);
                                });
                                return t ? ea(t) : null;
                            }),
                            (e.registerPlugin = function () {
                                for (
                                    var e = arguments.length,
                                        t = new Array(e),
                                        n = 0;
                                    n < e;
                                    n++
                                )
                                    t[n] = arguments[n];
                                t.forEach(sa), va();
                            }),
                            (e.getOptions = function () {
                                var e = {};
                                return (
                                    i(Ke(), function (t, n) {
                                        e[t] = n[0];
                                    }),
                                    e
                                );
                            }),
                            (e.setOptions = function (t) {
                                return (
                                    le(t) &&
                                        (ma.apps.forEach(function (e) {
                                            e.setOptions(t);
                                        }),
                                        $e(t)),
                                    e.getOptions()
                                );
                            });
                    }
                    (e.supported = _a),
                        Object.defineProperty(e, "__esModule", { value: !0 });
                })(t);
            },
            8588: function (e) {
                var t, n;
                (t = this),
                    (n = function (e) {
                        var t = function (e) {
                            return new t.lib.init(e);
                        };
                        function n(e, t) {
                            return t.offset[e]
                                ? isNaN(t.offset[e])
                                    ? t.offset[e]
                                    : t.offset[e] + "px"
                                : "0px";
                        }
                        function r(e, t) {
                            return !(
                                !e ||
                                "string" != typeof t ||
                                !(
                                    e.className &&
                                    e.className
                                        .trim()
                                        .split(/\s+/gi)
                                        .indexOf(t) > -1
                                )
                            );
                        }
                        return (
                            (t.defaults = {
                                oldestFirst: !0,
                                text: "Toastify is awesome!",
                                node: void 0,
                                duration: 3e3,
                                selector: void 0,
                                callback: function () {},
                                destination: void 0,
                                newWindow: !1,
                                close: !1,
                                gravity: "toastify-top",
                                positionLeft: !1,
                                position: "",
                                backgroundColor: "",
                                avatar: "",
                                className: "",
                                stopOnFocus: !0,
                                onClick: function () {},
                                offset: { x: 0, y: 0 },
                                escapeMarkup: !0,
                                style: { background: "" },
                            }),
                            (t.lib = t.prototype =
                                {
                                    toastify: "1.11.2",
                                    constructor: t,
                                    init: function (e) {
                                        return (
                                            e || (e = {}),
                                            (this.options = {}),
                                            (this.toastElement = null),
                                            (this.options.text =
                                                e.text || t.defaults.text),
                                            (this.options.node =
                                                e.node || t.defaults.node),
                                            (this.options.duration =
                                                0 === e.duration
                                                    ? 0
                                                    : e.duration ||
                                                      t.defaults.duration),
                                            (this.options.selector =
                                                e.selector ||
                                                t.defaults.selector),
                                            (this.options.callback =
                                                e.callback ||
                                                t.defaults.callback),
                                            (this.options.destination =
                                                e.destination ||
                                                t.defaults.destination),
                                            (this.options.newWindow =
                                                e.newWindow ||
                                                t.defaults.newWindow),
                                            (this.options.close =
                                                e.close || t.defaults.close),
                                            (this.options.gravity =
                                                "bottom" === e.gravity
                                                    ? "toastify-bottom"
                                                    : t.defaults.gravity),
                                            (this.options.positionLeft =
                                                e.positionLeft ||
                                                t.defaults.positionLeft),
                                            (this.options.position =
                                                e.position ||
                                                t.defaults.position),
                                            (this.options.backgroundColor =
                                                e.backgroundColor ||
                                                t.defaults.backgroundColor),
                                            (this.options.avatar =
                                                e.avatar || t.defaults.avatar),
                                            (this.options.className =
                                                e.className ||
                                                t.defaults.className),
                                            (this.options.stopOnFocus =
                                                void 0 === e.stopOnFocus
                                                    ? t.defaults.stopOnFocus
                                                    : e.stopOnFocus),
                                            (this.options.onClick =
                                                e.onClick ||
                                                t.defaults.onClick),
                                            (this.options.offset =
                                                e.offset || t.defaults.offset),
                                            (this.options.escapeMarkup =
                                                void 0 !== e.escapeMarkup
                                                    ? e.escapeMarkup
                                                    : t.defaults.escapeMarkup),
                                            (this.options.style =
                                                e.style || t.defaults.style),
                                            e.backgroundColor &&
                                                (this.options.style.background =
                                                    e.backgroundColor),
                                            this
                                        );
                                    },
                                    buildToast: function () {
                                        if (!this.options)
                                            throw "Toastify is not initialized";
                                        var e = document.createElement("div");
                                        for (var t in ((e.className =
                                            "toastify on " +
                                            this.options.className),
                                        this.options.position
                                            ? (e.className +=
                                                  " toastify-" +
                                                  this.options.position)
                                            : !0 === this.options.positionLeft
                                            ? ((e.className +=
                                                  " toastify-left"),
                                              console.warn(
                                                  "Property `positionLeft` will be depreciated in further versions. Please use `position` instead."
                                              ))
                                            : (e.className +=
                                                  " toastify-right"),
                                        (e.className +=
                                            " " + this.options.gravity),
                                        this.options.backgroundColor &&
                                            console.warn(
                                                'DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'
                                            ),
                                        this.options.style))
                                            e.style[t] = this.options.style[t];
                                        if (
                                            this.options.node &&
                                            this.options.node.nodeType ===
                                                Node.ELEMENT_NODE
                                        )
                                            e.appendChild(this.options.node);
                                        else if (
                                            (this.options.escapeMarkup
                                                ? (e.innerText =
                                                      this.options.text)
                                                : (e.innerHTML =
                                                      this.options.text),
                                            "" !== this.options.avatar)
                                        ) {
                                            var r =
                                                document.createElement("img");
                                            (r.src = this.options.avatar),
                                                (r.className =
                                                    "toastify-avatar"),
                                                "left" ==
                                                    this.options.position ||
                                                !0 === this.options.positionLeft
                                                    ? e.appendChild(r)
                                                    : e.insertAdjacentElement(
                                                          "afterbegin",
                                                          r
                                                      );
                                        }
                                        if (!0 === this.options.close) {
                                            var i =
                                                document.createElement("span");
                                            (i.innerHTML = "&#10006;"),
                                                (i.className = "toast-close"),
                                                i.addEventListener(
                                                    "click",
                                                    function (e) {
                                                        e.stopPropagation(),
                                                            this.removeElement(
                                                                this
                                                                    .toastElement
                                                            ),
                                                            window.clearTimeout(
                                                                this
                                                                    .toastElement
                                                                    .timeOutValue
                                                            );
                                                    }.bind(this)
                                                );
                                            var o =
                                                window.innerWidth > 0
                                                    ? window.innerWidth
                                                    : screen.width;
                                            ("left" == this.options.position ||
                                                !0 ===
                                                    this.options
                                                        .positionLeft) &&
                                            o > 360
                                                ? e.insertAdjacentElement(
                                                      "afterbegin",
                                                      i
                                                  )
                                                : e.appendChild(i);
                                        }
                                        if (
                                            this.options.stopOnFocus &&
                                            this.options.duration > 0
                                        ) {
                                            var a = this;
                                            e.addEventListener(
                                                "mouseover",
                                                function (t) {
                                                    window.clearTimeout(
                                                        e.timeOutValue
                                                    );
                                                }
                                            ),
                                                e.addEventListener(
                                                    "mouseleave",
                                                    function () {
                                                        e.timeOutValue =
                                                            window.setTimeout(
                                                                function () {
                                                                    a.removeElement(
                                                                        e
                                                                    );
                                                                },
                                                                a.options
                                                                    .duration
                                                            );
                                                    }
                                                );
                                        }
                                        if (
                                            (void 0 !==
                                                this.options.destination &&
                                                e.addEventListener(
                                                    "click",
                                                    function (e) {
                                                        e.stopPropagation(),
                                                            !0 ===
                                                            this.options
                                                                .newWindow
                                                                ? window.open(
                                                                      this
                                                                          .options
                                                                          .destination,
                                                                      "_blank"
                                                                  )
                                                                : (window.location =
                                                                      this.options.destination);
                                                    }.bind(this)
                                                ),
                                            "function" ==
                                                typeof this.options.onClick &&
                                                void 0 ===
                                                    this.options.destination &&
                                                e.addEventListener(
                                                    "click",
                                                    function (e) {
                                                        e.stopPropagation(),
                                                            this.options.onClick();
                                                    }.bind(this)
                                                ),
                                            "object" ==
                                                typeof this.options.offset)
                                        ) {
                                            var s = n("x", this.options),
                                                u = n("y", this.options),
                                                l =
                                                    "left" ==
                                                    this.options.position
                                                        ? s
                                                        : "-" + s,
                                                c =
                                                    "toastify-top" ==
                                                    this.options.gravity
                                                        ? u
                                                        : "-" + u;
                                            e.style.transform =
                                                "translate(" +
                                                l +
                                                "," +
                                                c +
                                                ")";
                                        }
                                        return e;
                                    },
                                    showToast: function () {
                                        var e;
                                        if (
                                            ((this.toastElement =
                                                this.buildToast()),
                                            !(e =
                                                "string" ==
                                                typeof this.options.selector
                                                    ? document.getElementById(
                                                          this.options.selector
                                                      )
                                                    : this.options
                                                          .selector instanceof
                                                          HTMLElement ||
                                                      ("undefined" !=
                                                          typeof ShadowRoot &&
                                                          this.options
                                                              .selector instanceof
                                                              ShadowRoot)
                                                    ? this.options.selector
                                                    : document.body))
                                        )
                                            throw "Root element is not defined";
                                        var n = t.defaults.oldestFirst
                                            ? e.firstChild
                                            : e.lastChild;
                                        return (
                                            e.insertBefore(
                                                this.toastElement,
                                                n
                                            ),
                                            t.reposition(),
                                            this.options.duration > 0 &&
                                                (this.toastElement.timeOutValue =
                                                    window.setTimeout(
                                                        function () {
                                                            this.removeElement(
                                                                this
                                                                    .toastElement
                                                            );
                                                        }.bind(this),
                                                        this.options.duration
                                                    )),
                                            this
                                        );
                                    },
                                    hideToast: function () {
                                        this.toastElement.timeOutValue &&
                                            clearTimeout(
                                                this.toastElement.timeOutValue
                                            ),
                                            this.removeElement(
                                                this.toastElement
                                            );
                                    },
                                    removeElement: function (e) {
                                        (e.className = e.className.replace(
                                            " on",
                                            ""
                                        )),
                                            window.setTimeout(
                                                function () {
                                                    this.options.node &&
                                                        this.options.node
                                                            .parentNode &&
                                                        this.options.node.parentNode.removeChild(
                                                            this.options.node
                                                        ),
                                                        e.parentNode &&
                                                            e.parentNode.removeChild(
                                                                e
                                                            ),
                                                        this.options.callback.call(
                                                            e
                                                        ),
                                                        t.reposition();
                                                }.bind(this),
                                                400
                                            );
                                    },
                                }),
                            (t.reposition = function () {
                                for (
                                    var e,
                                        t = { top: 15, bottom: 15 },
                                        n = { top: 15, bottom: 15 },
                                        i = { top: 15, bottom: 15 },
                                        o =
                                            document.getElementsByClassName(
                                                "toastify"
                                            ),
                                        a = 0;
                                    a < o.length;
                                    a++
                                ) {
                                    e =
                                        !0 === r(o[a], "toastify-top")
                                            ? "toastify-top"
                                            : "toastify-bottom";
                                    var s = o[a].offsetHeight;
                                    (e = e.substr(9, e.length - 1)),
                                        (window.innerWidth > 0
                                            ? window.innerWidth
                                            : screen.width) <= 360
                                            ? ((o[a].style[e] = i[e] + "px"),
                                              (i[e] += s + 15))
                                            : !0 === r(o[a], "toastify-left")
                                            ? ((o[a].style[e] = t[e] + "px"),
                                              (t[e] += s + 15))
                                            : ((o[a].style[e] = n[e] + "px"),
                                              (n[e] += s + 15));
                                }
                                return this;
                            }),
                            (t.lib.init.prototype = t.lib),
                            t
                        );
                    }),
                    e.exports ? (e.exports = n()) : (t.Toastify = n());
            },
        },
        t = {};
    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = (t[r] = { exports: {} });
        return e[r].call(o.exports, o, o.exports, n), o.exports;
    }
    (n.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, { a: t }), t;
    }),
        (n.d = (e, t) => {
            for (var r in t)
                n.o(t, r) &&
                    !n.o(e, r) &&
                    Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        }),
        (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (() => {
            "use strict";
            var e = n(8588),
                t = n.n(e),
                r = n(6136),
                i = n(8236),
                o = n.n(i),
                a = n(521),
                s = n.n(a),
                u = n(5180),
                l = n.n(u),
                c = n(2965),
                f = n.n(c),
                d = n(1571),
                p = n.n(d),
                E = n(5227),
                h = n.n(E),
                _ = n(3567),
                m = n.n(_);
            r.registerPlugin(o(), s(), l(), f(), p(), h(), m()),
                r.create(document.querySelector(".basic-filepond"), {
                    credits: null,
                    allowImagePreview: !1,
                    allowMultiple: !1,
                    allowFileEncode: !1,
                    required: !1,
                }),
                r.create(document.querySelector(".multiple-files-filepond"), {
                    credits: null,
                    allowImagePreview: !1,
                    allowMultiple: !0,
                    allowFileEncode: !1,
                    required: !1,
                }),
                r.create(document.querySelector(".with-validation-filepond"), {
                    credits: null,
                    allowImagePreview: !1,
                    allowMultiple: !0,
                    allowFileEncode: !1,
                    required: !0,
                    acceptedFileTypes: ["image/png"],
                    fileValidateTypeDetectType: function (e, t) {
                        return new Promise(function (e, n) {
                            e(t);
                        });
                    },
                }),
                r.create(document.querySelector(".imgbb-filepond"), {
                    credits: null,
                    allowImagePreview: !1,
                    server: {
                        process: function (e, n, r, i, o, a, s) {
                            var u = new FormData();
                            u.append(e, n, n.name);
                            var l = new XMLHttpRequest();
                            l.open(
                                "POST",
                                "https://api.imgbb.com/1/upload?key=762894e2014f83c023b233b2f10395e2"
                            ),
                                (l.upload.onprogress = function (e) {
                                    a(e.lengthComputable, e.loaded, e.total);
                                }),
                                (l.onload = function () {
                                    l.status >= 200 && l.status < 300
                                        ? i(l.responseText)
                                        : o("oh no");
                                }),
                                (l.onreadystatechange = function () {
                                    if (4 == this.readyState)
                                        if (200 == this.status) {
                                            var e = JSON.parse(
                                                this.responseText
                                            );
                                            t()({
                                                text: "Success uploading to imgbb! see console f12",
                                                duration: 3e3,
                                                close: !0,
                                                gravity: "bottom",
                                                position: "right",
                                                backgroundColor: "#4fbe87",
                                            }).showToast(),
                                                console.log(e);
                                        } else
                                            t()({
                                                text: "Failed uploading to imgbb! see console f12",
                                                duration: 3e3,
                                                close: !0,
                                                gravity: "bottom",
                                                position: "right",
                                                backgroundColor: "#ff0000",
                                            }).showToast(),
                                                console.log(
                                                    "Error",
                                                    this.statusText
                                                );
                                }),
                                l.send(u);
                        },
                    },
                }),
                r.create(document.querySelector(".image-preview-filepond"), {
                    credits: null,
                    allowImagePreview: !0,
                    allowImageFilter: !1,
                    allowImageExifOrientation: !1,
                    allowImageCrop: !1,
                    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
                    fileValidateTypeDetectType: function (e, t) {
                        return new Promise(function (e, n) {
                            e(t);
                        });
                    },
                }),
                r.create(document.querySelector(".image-crop-filepond"), {
                    credits: null,
                    allowImagePreview: !0,
                    allowImageFilter: !1,
                    allowImageExifOrientation: !1,
                    allowImageCrop: !0,
                    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
                    fileValidateTypeDetectType: function (e, t) {
                        return new Promise(function (e, n) {
                            e(t);
                        });
                    },
                }),
                r.create(document.querySelector(".image-exif-filepond"), {
                    credits: null,
                    allowImagePreview: !0,
                    allowImageFilter: !1,
                    allowImageExifOrientation: !0,
                    allowImageCrop: !1,
                    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
                    fileValidateTypeDetectType: function (e, t) {
                        return new Promise(function (e, n) {
                            e(t);
                        });
                    },
                }),
                r.create(document.querySelector(".image-filter-filepond"), {
                    credits: null,
                    allowImagePreview: !0,
                    allowImageFilter: !0,
                    allowImageExifOrientation: !1,
                    allowImageCrop: !1,
                    imageFilterColorMatrix: [
                        0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0,
                        0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0,
                    ],
                    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
                    fileValidateTypeDetectType: function (e, t) {
                        return new Promise(function (e, n) {
                            e(t);
                        });
                    },
                }),
                r.create(document.querySelector(".image-resize-filepond"), {
                    credits: null,
                    allowImagePreview: !0,
                    allowImageFilter: !1,
                    allowImageExifOrientation: !1,
                    allowImageCrop: !1,
                    allowImageResize: !0,
                    imageResizeTargetWidth: 200,
                    imageResizeTargetHeight: 200,
                    imageResizeMode: "cover",
                    imageResizeUpscale: !0,
                    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
                    fileValidateTypeDetectType: function (e, t) {
                        return new Promise(function (e, n) {
                            e(t);
                        });
                    },
                });
        })();
})();
