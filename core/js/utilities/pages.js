export function normalizePage(page) {
    if (!page || typeof page !== "object") {
        return { title: "", contentHtml: "" };
    }

    const title = typeof page.title === "string" ? page.title : "";

    let contentHtml = "";
    if (Array.isArray(page.contentLines)) {
        contentHtml = page.contentLines.join("\n");
    } else if (typeof page.content === "string") {
        contentHtml = page.content;
    }

    return { title, contentHtml };
}

export async function loadPage(slug) {
    const res = await fetch(`./app/pages/${slug}.json`);
    if (!res.ok) {
        throw new Error(`Failed to load page '${slug}': ${res.status}`);
    }

    const page = await res.json();
    return normalizePage(page);
}
