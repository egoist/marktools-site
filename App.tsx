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
    "GitHub-flavoured Markdown support",
    "Quick navigation with Table of Contents",
    "Open rendered HTML in default browser",
    "Export Markdown to PDF",
    "Pin / Unpin window",
    "Syntax highlighting for code blocks",
    "Link checker (for broken links, coming soon)",
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
            <h1 class="text-7xl font-bold">Marktools</h1>
            <h1 class="text-6xl font-medium mt-1 text-zinc-400">
              Smart markdown preview
            </h1>
            <div class="mt-10">
              <button
                type="button"
                class="border rounded-full h-10 inline-flex items-center px-5 bg-indigo-500 border-indigo-500 text-white hover:shadow-lg disabled:cursor-progress"
                onClick={download}
                disabled={!asset()}
              >
                Download for Mac <Show when={version()}>({version})</Show>
              </button>
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
