export function base64ToBlob(base64Data: string): Blob {
  let arr = base64Data.split(","),
    fileType = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    l = bstr.length,
    u8Arr = new Uint8Array(l);

  while (l--) {
    u8Arr[l] = bstr.charCodeAt(l);
  }
  return new Blob([u8Arr], {
    type: fileType,
  });
}

export const mulSlectNoB64Url = window.URL.createObjectURL(
  base64ToBlob(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABoSURBVHgB7dKxDYAwDATAx8oAjMAKbESbDiaADSijTMMIrOARMoHhIzGAoUR56Tuf3HyXUppEZAfQwxdlt0C0mtkYY1SP4qOB5kTO+cLLVCP4mAb/A0udkRc8txq404XbOzgjLy7sfAMvcB922fU/cwAAAABJRU5ErkJggg=="
  )
);

export const mulSelectB64Url = window.URL.createObjectURL(
  base64ToBlob(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzSURBVHgBzc+rEQAwCATRhUpw6Sf9zwSXMvLxMFie3TMnY+4FGJGDaxo/wZRCl4Gn9d28etwHTv9XB30AAAAASUVORK5CYII="
  )
);

export const radioSelectNoB64Url = window.URL.createObjectURL(
  base64ToBlob(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEZSURBVHgBnZLNbYNAEIV3l4hzSnAJuIKQDtJB2BNCHHAHsUvwBQQXSAfpIEoFbAmUkDMINu85uxKylJhkpLGHYb5h/qRYSdu29+M4HmA+Q3f0SSnNsizGWnvKsmzwscobVVUlgHqYFsFJmqaSOk2TVkoJaF+W5cHHS/7UdU1HgcyP66xrQeId4HeYRyR8lc7RA9r/BF3DYRjuVRAEL6j/7RZEcTEdWiruYETzPGuxUVDZB77asj8r/ihklPinEBzQdLwVaJomwp8h2KHmB7FdCgzTKIz2jIeEo75FMAbQE69Iaa0/MakT9/Mb7HcI6Mi1SP/CXc9lp1jPOc9z44AYQCy+7/dyNfTL66zuIDiAyLkHaMeWWJ2P/QLo55PerNdCZgAAAABJRU5ErkJggg=="
  )
);

export const radioSelectB64Url = window.URL.createObjectURL(
  base64ToBlob(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACWSURBVHgBfZBNEcIwEIXf22HawAkcFAdYqAMcgAOQgATqoDioAyzEAZHQY+CQJcv0wPCT77YzX/L2LZFptrelE3dUYGcjFIHEJaZ4DsN6pAkV6yvJDT5QVf/QezubfvgSDHtY0R1kivgLgb28dijTmBSKSi5hcX3RUfSySK6D0v8WcjvETvywGudat5pweosONlt9u9MTLiw67xd19lYAAAAASUVORK5CYII="
  )
);
