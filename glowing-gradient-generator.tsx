"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  const [color1, setColor1] = useState("#ffffff")
  const [color2, setColor2] = useState("#93c5fd")
  const [color3, setColor3] = useState("#ffffff")
  const [gradientDirection, setGradientDirection] = useState("to right")
  const [isDynamic, setIsDynamic] = useState(false)
  const [animationDuration, setAnimationDuration] = useState(4)
  const [animationTimingFunction, setAnimationTimingFunction] = useState("ease-in-out")
  const [animationIterationCount, setAnimationIterationCount] = useState("infinite")

  const generatedCss = useMemo(() => {
    const gradientColors = `${color1}, ${color2}, ${color3}`
    const backgroundSize = isDynamic ? "200% 200%" : "100% 100%"
    const animationProps = isDynamic
      ? `gradient-animation ${animationDuration}s ${animationTimingFunction} ${animationIterationCount}`
      : "none"

    return `
.glowing-gradient-effect {
  background: linear-gradient(${gradientDirection}, ${gradientColors});
  background-size: ${backgroundSize};
  animation: ${animationProps};
}

${
  isDynamic
    ? `
@keyframes gradient-animation {
  0% { background-position: 100% 0%; }
  100% { background-position: -100% 0%; }
}
`
    : ""
}
    `.trim()
  }, [
    color1,
    color2,
    color3,
    gradientDirection,
    isDynamic,
    animationDuration,
    animationTimingFunction,
    animationIterationCount
  ])

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 w-full max-w-6xl mx-auto">
      <Card className="w-full lg:w-1/2">
        <CardHeader>
          <CardTitle>Glowing Gradient Generator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="color1">Color 1</Label>
            <Input id="color1" type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color2">Color 2</Label>
            <Input id="color2" type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color3">Color 3</Label>
            <Input id="color3" type="color" value={color3} onChange={(e) => setColor3(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gradientDirection">Gradient Direction</Label>
            <Select value={gradientDirection} onValueChange={setGradientDirection}>
              <SelectTrigger id="gradientDirection">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to right">To Right</SelectItem>
                <SelectItem value="to left">To Left</SelectItem>
                <SelectItem value="to top">To Top</SelectItem>
                <SelectItem value="to bottom">To Bottom</SelectItem>
                <SelectItem value="to top right">To Top Right</SelectItem>
                <SelectItem value="to bottom left">To Bottom Left</SelectItem>
                <SelectItem value="45deg">45 Degrees</SelectItem>
                <SelectItem value="90deg">90 Degrees</SelectItem>
                <SelectItem value="135deg">135 Degrees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="dynamic-effect">Dynamic Effect</Label>
            <Switch id="dynamic-effect" checked={isDynamic} onCheckedChange={setIsDynamic} />
          </div>

          {isDynamic && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="animationDuration">Animation Duration ({animationDuration}s)</Label>
                <Slider
                  id="animationDuration"
                  min={1}
                  max={20}
                  step={0.5}
                  value={[animationDuration]}
                  onValueChange={(val) => setAnimationDuration(val[0])}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="animationTimingFunction">Animation Timing Function</Label>
                <Select value={animationTimingFunction} onValueChange={setAnimationTimingFunction}>
                  <SelectTrigger id="animationTimingFunction">
                    <SelectValue placeholder="Select timing function" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ease">ease</SelectItem>
                    <SelectItem value="linear">linear</SelectItem>
                    <SelectItem value="ease-in">ease-in</SelectItem>
                    <SelectItem value="ease-out">ease-out</SelectItem>
                    <SelectItem value="ease-in-out">ease-in-out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="animationIterationCount">Animation Iteration Count</Label>
                <Select value={animationIterationCount} onValueChange={setAnimationIterationCount}>
                  <SelectTrigger id="animationIterationCount">
                    <SelectValue placeholder="Select iteration count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infinite">infinite</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-4">
            <style>{generatedCss}</style>
            <div className="glowing-gradient-effect w-full h-[200px] shadow-sm border rounded-lg"></div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Generated CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea className="font-mono text-sm h-[300px] resize-y" readOnly value={generatedCss} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
