#!/bin/bash
mkdir /usr/share/SHCreateModule
cp -r $(dirname $(readlink -f $0))/../templates /usr/share/SHCreateModule