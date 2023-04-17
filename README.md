# rocketchat-tab for Open edX

The Open edX module adds a new course tab that integrates a Rocket.Chat room.

Add the module name `bb-tab` to the *Advanced Module List* (`Settings -> Advanced Settings`) to display the Chat tab after installing the module.

``` json
[
    "bbb-tab"
]
```

**Please note**

- These instructions are written for [Tutor](https://docs.tutor.overhang.io/) (the Docker-based Open edX distribution).

## Development

**Installation**

The installation method is similar to installing XBlocks or other custom modules.

``` bash
cd $(tutor config printroot)/env/build/openedx/requirements
git clone https://github.com/thekingf4/bigbluebutton-app-v1
echo "-e ./bigbluebutton-app-v1/" >> private.txt

# Stop and start Tutor dev to rebuild the images to include the new tab
tutor dev stop && tutor dev start -d
```

**Configuration**

## Production

**Installation**

The installation method is similar to installing XBlocks or other custom modules.

``` bash
cd $(tutor config printroot)/env/build/openedx/requirements
echo "git+https://github.com/thekingf4/bigbluebutton-app-v1" >> private.txt

# Build the images and then restart Tutor
tutor images build openedx
tutor local stop & tutor local start -d
```

**Configuration**

