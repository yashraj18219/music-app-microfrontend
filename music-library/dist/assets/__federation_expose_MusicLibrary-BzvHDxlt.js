import { importShared } from './__federation_fn_import-gVVR6EuA.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const mockSongs = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: 1975,
    genre: "Rock",
    duration: "5:55",
    rating: 5
  },
  {
    id: "2",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    year: 1976,
    genre: "Rock",
    duration: "6:30",
    rating: 5
  },
  {
    id: "3",
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    year: 1971,
    genre: "Pop",
    duration: "3:03",
    rating: 5
  },
  {
    id: "4",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    year: 1971,
    genre: "Rock",
    duration: "8:02",
    rating: 5
  },
  {
    id: "5",
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    year: 1965,
    genre: "Folk Rock",
    duration: "6:13",
    rating: 5
  },
  {
    id: "6",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    year: 1991,
    genre: "Grunge",
    duration: "5:01",
    rating: 5
  },
  {
    id: "7",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    year: 1982,
    genre: "Pop",
    duration: "4:54",
    rating: 5
  },
  {
    id: "8",
    title: "Hey Jude",
    artist: "The Beatles",
    album: "Single",
    year: 1968,
    genre: "Pop Rock",
    duration: "7:11",
    rating: 5
  },
  {
    id: "9",
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    year: 1987,
    genre: "Hard Rock",
    duration: "5:56",
    rating: 5
  },
  {
    id: "10",
    title: "Wonderwall",
    artist: "Oasis",
    album: "What's the Story Morning Glory?",
    year: 1995,
    genre: "Britpop",
    duration: "4:18",
    rating: 4
  }
];

const SongList = ({ songs, onDeleteSong, groupBy }) => {
  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };
  const renderSongItem = (song) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "song-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "song-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "song-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "song-title", children: song.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "song-artist", children: song.artist })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "song-details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "song-album", children: song.album }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "song-year", children: song.year }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "song-genre", children: song.genre }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "song-duration", children: song.duration })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "song-rating", children: renderStars(song.rating) })
    ] }),
    onDeleteSong && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => onDeleteSong(song.id),
        className: "delete-btn",
        title: "Delete song",
        children: "🗑️"
      }
    )
  ] }, song.id);
  const renderGroupedSongs = () => {
    if (groupBy === "none") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "songs-container", children: songs.map(renderSongItem) });
    }
    const grouped = songs.reduce((acc, song) => {
      const key = song[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(song);
      return acc;
    }, {});
    const sortedGroups = Object.entries(grouped).sort(([a], [b]) => {
      if (groupBy === "year") {
        return Number(b) - Number(a);
      }
      return String(a).localeCompare(String(b));
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grouped-songs", children: sortedGroups.map(([groupKey, groupSongs]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "song-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "group-header", children: [
        groupBy === "year" ? `${groupKey}s` : groupKey,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "group-count", children: [
          "(",
          groupSongs.length,
          " songs)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "songs-container", children: groupSongs.map(renderSongItem) })
    ] }, groupKey)) });
  };
  if (songs.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-songs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "No songs found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Try adjusting your filters or add some songs to get started." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "song-list", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "🎵 Songs (",
        songs.length,
        ")"
      ] }),
      groupBy !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "grouping-info", children: [
        "Grouped by ",
        groupBy
      ] })
    ] }),
    renderGroupedSongs()
  ] });
};

const {useState: useState$1} = await importShared('react');
const SongForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState$1({
    title: "",
    artist: "",
    album: "",
    year: (/* @__PURE__ */ new Date()).getFullYear(),
    genre: "Rock",
    duration: "3:30",
    rating: 5
  });
  const [errors, setErrors] = useState$1({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.artist.trim()) {
      newErrors.artist = "Artist is required";
    }
    if (!formData.album.trim()) {
      newErrors.album = "Album is required";
    }
    if (formData.year < 1900 || formData.year > (/* @__PURE__ */ new Date()).getFullYear()) {
      newErrors.year = "Year must be between 1900 and current year";
    }
    if (!formData.duration.match(/^\d+:\d{2}$/)) {
      newErrors.duration = "Duration must be in format MM:SS";
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: void 0 }));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "song-form-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "song-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "➕ Add New Song" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "title", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "title",
              value: formData.title,
              onChange: (e) => handleChange("title", e.target.value),
              className: errors.title ? "error" : ""
            }
          ),
          errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-text", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "artist", children: "Artist *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "artist",
              value: formData.artist,
              onChange: (e) => handleChange("artist", e.target.value),
              className: errors.artist ? "error" : ""
            }
          ),
          errors.artist && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-text", children: errors.artist })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "album", children: "Album *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "album",
              value: formData.album,
              onChange: (e) => handleChange("album", e.target.value),
              className: errors.album ? "error" : ""
            }
          ),
          errors.album && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-text", children: errors.album })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "year", children: "Year *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              id: "year",
              value: formData.year,
              onChange: (e) => handleChange("year", parseInt(e.target.value)),
              min: "1900",
              max: (/* @__PURE__ */ new Date()).getFullYear(),
              className: errors.year ? "error" : ""
            }
          ),
          errors.year && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-text", children: errors.year })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "genre", children: "Genre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "genre",
              value: formData.genre,
              onChange: (e) => handleChange("genre", e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rock", children: "Rock" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pop", children: "Pop" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Jazz", children: "Jazz" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Classical", children: "Classical" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Hip Hop", children: "Hip Hop" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Country", children: "Country" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Electronic", children: "Electronic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Folk", children: "Folk" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Blues", children: "Blues" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "R&B", children: "R&B" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "duration", children: "Duration *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "duration",
              placeholder: "3:30",
              value: formData.duration,
              onChange: (e) => handleChange("duration", e.target.value),
              className: errors.duration ? "error" : ""
            }
          ),
          errors.duration && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-text", children: errors.duration })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "rating", children: "Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rating-input", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: `star ${star <= formData.rating ? "active" : ""}`,
            onClick: () => handleChange("rating", star),
            children: "⭐"
          },
          star
        )) }),
        errors.rating && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-text", children: errors.rating })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "submit-btn", children: "Add Song" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onCancel, className: "cancel-btn", children: "Cancel" })
      ] })
    ] })
  ] }) });
};

const FilterControls = ({
  filters,
  onFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  groupBy,
  onGroupByChange,
  songs
}) => {
  const uniqueAlbums = [...new Set(songs.map((song) => song.album))].sort();
  const uniqueArtists = [...new Set(songs.map((song) => song.artist))].sort();
  const uniqueTitles = [...new Set(songs.map((song) => song.title))].sort();
  const clearFilters = () => {
    onFilterChange({
      search: "",
      album: "",
      artist: "",
      title: ""
    });
  };
  const hasActiveFilters = filters.search || filters.album || filters.artist || filters.title;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-controls", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🔍 Search & Filters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "search", children: "Search:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "search",
              placeholder: "Search songs...",
              value: filters.search,
              onChange: (e) => onFilterChange({ search: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "album", children: "Album:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "album",
              value: filters.album,
              onChange: (e) => onFilterChange({ album: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Albums" }),
                uniqueAlbums.map((album) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: album, children: album }, album))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "artist", children: "Artist:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "artist",
              value: filters.artist,
              onChange: (e) => onFilterChange({ artist: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Artists" }),
                uniqueArtists.map((artist) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: artist, children: artist }, artist))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "title", children: "Title:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "title",
              value: filters.title,
              onChange: (e) => onFilterChange({ title: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Titles" }),
                uniqueTitles.map((title) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: title, children: title }, title))
              ]
            }
          )
        ] })
      ] }),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearFilters, className: "clear-filters-btn", children: "Clear All Filters" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📊 Sort & Group" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sortBy", children: "Sort By:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "sortBy",
              value: sortBy,
              onChange: (e) => onSortByChange(e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Artist" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Album" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "year", children: "Year" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Sort Order:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc"),
              className: `sort-order-btn ${sortOrder}`,
              children: sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "groupBy", children: "Group By:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "groupBy",
              value: groupBy,
              onChange: (e) => onGroupByChange(e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "No Grouping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Album" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Artist" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "year", children: "Year" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
};

const StatsDisplay = ({ songs, totalSongs }) => {
  const stats = songs.reduce((acc, song) => {
    acc.genres[song.genre] = (acc.genres[song.genre] || 0) + 1;
    const decade = Math.floor(song.year / 10) * 10;
    acc.decades[decade] = (acc.decades[decade] || 0) + 1;
    const [minutes, seconds] = song.duration.split(":").map(Number);
    acc.totalDuration += minutes * 60 + seconds;
    acc.totalRating += song.rating;
    return acc;
  }, {
    genres: {},
    decades: {},
    totalDuration: 0,
    totalRating: 0
  });
  const averageRating = songs.length > 0 ? (stats.totalRating / songs.length).toFixed(1) : "0";
  const totalHours = Math.floor(stats.totalDuration / 3600);
  const totalMinutes = Math.floor(stats.totalDuration % 3600 / 60);
  const topGenres = Object.entries(stats.genres).sort(([, a], [, b]) => b - a).slice(0, 3).map(([genre, count]) => `${genre} (${count})`).join(", ");
  const topDecades = Object.entries(stats.decades).sort(([a], [b]) => Number(b) - Number(a)).slice(0, 3).map(([decade, count]) => `${decade}s (${count})`).join(", ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stats-display", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📊 Library Stats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Total Songs:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: totalSongs })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Filtered Songs:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: songs.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Total Duration:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
          totalHours,
          "h ",
          totalMinutes,
          "m"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Average Rating:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
          "⭐ ",
          averageRating,
          "/5"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎵 Top Genres" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-text", children: topGenres || "No data" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📅 Top Decades" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-text", children: topDecades || "No data" })
    ] })
  ] }) });
};

const {useState,useEffect} = await importShared('react');
const MusicLibrary = ({ userRole }) => {
  const [songs, setSongs] = useState(mockSongs);
  const [filteredSongs, setFilteredSongs] = useState(mockSongs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    album: "",
    artist: "",
    title: ""
  });
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [groupBy, setGroupBy] = useState("none");
  useEffect(() => {
    let result = [...songs];
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (song) => song.title.toLowerCase().includes(searchLower) || song.artist.toLowerCase().includes(searchLower) || song.album.toLowerCase().includes(searchLower)
      );
    }
    if (filters.album) {
      result = result.filter((song) => song.album === filters.album);
    }
    if (filters.artist) {
      result = result.filter((song) => song.artist === filters.artist);
    }
    if (filters.title) {
      result = result.filter((song) => song.title === filters.title);
    }
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredSongs(result);
  }, [songs, filters, sortBy, sortOrder]);
  const addSong = (newSong) => {
    const song = {
      ...newSong,
      id: Date.now().toString()
    };
    setSongs((prev) => [...prev, song]);
    setShowAddForm(false);
  };
  const deleteSong = (id) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  const toggleSortOrder = () => {
    setSortOrder((prev) => prev === "asc" ? "desc" : "asc");
  };
  const isAdmin = userRole === "admin";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "music-library", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "library-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🎵 Music Library" }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowAddForm(true),
          className: "add-song-btn",
          children: "+ Add Song"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatsDisplay, { songs: filteredSongs, totalSongs: songs.length }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterControls,
      {
        filters,
        onFilterChange: updateFilters,
        sortBy,
        onSortByChange: setSortBy,
        sortOrder,
        onSortOrderChange: toggleSortOrder,
        groupBy,
        onGroupByChange: setGroupBy,
        songs
      }
    ),
    showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SongForm,
      {
        onSubmit: addSong,
        onCancel: () => setShowAddForm(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SongList,
      {
        songs: filteredSongs,
        onDeleteSong: isAdmin ? deleteSong : void 0,
        groupBy
      }
    )
  ] });
};

export { MusicLibrary as default, jsxRuntimeExports as j };
