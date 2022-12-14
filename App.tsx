import { Component, createSignal, For, onMount, Show } from "solid-js"
import clsx from "clsx"
import preview from "./images/1.jpg"

const Dot: Component<{ class?: string }> = ({ class: className }) => {
  return (
    <span
      class={clsx("inline-block w-3 h-3 rounded-full border", className)}
    ></span>
  )
}

export const App = () => {
  const features = [
    "Live preview, automatically refresh on change",
    "GitHub-flavoured Markdown support",
    "Quick navigation with Table of Contents",
    "Open rendered HTML in default browser",
    "Export Markdown to PDF",
    "Pin / Unpin window",
    "Syntax highlighting for code blocks",
    "Link checker (for broken links)",
    "Render math expressions (soon)",
  ]

  const [asset, setAsset] = createSignal<{ name: string; url: string } | null>(
    null
  )
  const [version, setVersion] = createSignal<string | null>(null)

  const download = () => {
    const assetValue = asset()
    if (!assetValue) {
      return
    }
    location.href = `https://updater.egoist.dev/download-asset?${new URLSearchParams(
      {
        asset: assetValue.url,
        filename: assetValue.name,
      }
    )}`
  }

  onMount(async () => {
    const release = await fetch(
      "https://updater.egoist.dev/egoist/marktools/latest",
      {
        headers: {},
      }
    ).then((res) => res.json())
    const asset = release.assets.find((a: any) => a.name.includes(".dmg"))
    setAsset(asset)
    setVersion(release.tag_name)
  })

  return (
    <div>
      <header class="py-10">
        <div class="container">
          <div>
            <h1 class="text-4xl md:text-7xl font-bold">Marktools</h1>
            <h1 class="text-2xl md:text-6xl font-medium mt-1 text-zinc-400">
              Smart markdown preview
            </h1>
            <div class="mt-10 flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center">
              <div class="w-full sm:w-auto flex space-y-2 flex-col sm:flex-row sm:space-y-0 sm:space-x-2">
                <button
                  type="button"
                  class="w-full border rounded-full h-10 inline-flex justify-center items-center px-5 bg-indigo-500 border-indigo-500 transition-shadow text-white hover:shadow-lg disabled:cursor-progress"
                  onClick={download}
                  disabled={!asset()}
                >
                  Download for Mac <Show when={version()}>({version})</Show>
                </button>
                <a
                  href="https://github.com/egoist/marktools-feedback/discussions"
                  target="_blank"
                  class="w-full sm:w-auto border rounded-full h-10 inline-flex justify-center items-center px-5 bg-zinc-100 border-zinc-200 text-zinc-500  hover:shadow-lg transition-shadow"
                >
                  Feedback
                </a>
              </div>
              <a
                href="https://store.egoist.dev/l/marktools"
                target="_blank"
                rel="nofollow noopener"
                class="inline-flex space-x-2 items-center underline underline-offset-2 hover:text-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <span>Buy a license</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div class="container">
          <h2 class="text-3xl font-bold mt-1">Preview any Markdown file</h2>
          <div class="mt-5">
            <header class="bg-zinc-100 rounded-t-lg px-2 border border-b-0 relative text-xs h-8 flex items-center">
              <div class="space-x-1 flex items-center">
                <Dot class="bg-red-500 border-red-600" />
                <Dot class="bg-yellow-500 border-yellow-600" />
                <Dot class="bg-green-500 border-green-600" />
              </div>
              <span class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                README.md - Marktools
              </span>
            </header>
            <div class="border w-full rounded-b-lg overflow-hidden">
              <img src={preview} alt="preview" />
            </div>
          </div>
        </div>
      </section>
      <section class="mt-10">
        <div class="container">
          <h2 class="text-3xl font-bold mt-1">All features</h2>
          <div class="mt-5">
            <div class="bg-zinc-100 rounded-lg overflow-hidden">
              <For each={features}>
                {(feature) => {
                  return <div class="px-3 py-2 even:bg-zinc-200">{feature}</div>
                }}
              </For>
            </div>
          </div>
        </div>
      </section>
      <footer class="mt-10 text-zinc-500 text-sm">
        <div class="container">
          <div class="border-t  py-5">
            2022 &copy; Made by <a href="https://egoist.dev">EGOIST</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
