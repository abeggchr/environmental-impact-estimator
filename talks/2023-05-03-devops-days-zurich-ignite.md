# DevOps Days Zurich

* https://sessionize.com/devopsdays-zurich-2023/
* Call closes: 31.1.2023
* Format: Ignite talk (5min, 20 slides, auto-forward)
* Conference: 3./4. Mai

## Preparation

### Topic

* Environmental impact of developing, operating and running software
* orders of magnitude
* how to reduce

### Claim

* the same way climate change affects us all

### Value for the listeners

* 3 reduction measures at your touchpoint in the software lifecycle

### Motivation

#### Love

* love my job, advances humanity

#### Hate

* worried about climate change

#### Learned

* at the intersection of climate change and software

### The 4 points

#### Problem: environmental impact

* carbon
* land
* pollution
* water
* resource extraction

#### Simulation: 

#### Reduction measures

* top 5
* more

* near/off shoring
* commuting
* pue
* cloud
* zombie
* overprovisioning: cpu
* overprovisioning: memory
* data reduction
* hardware usage span
* change energy mix
* carbon-awareness
* efficient programming


### Overview

* Introduction, Problem, Scope, Baseline
* Measure 1: way of working (comute, distribution, hardware lifespan)
* Measure 2: data-center (pue, cloud, zombie)
* Measure 3: software (provisioning, efficency, carbon-awareness)
* Summary

### Abstract

At first glance, the IT industry seems to be a relatively clean sector. 
However, the development and operation of software have a significant environmental impact that is often overlooked. 
In this talk, we will see measures to reduce energy consumption and greenhouse gas emissions along the software lifecycle, ranging from coding over datacenter operation to the way individuals are working.
By the end of the presentation, attendees will have actionable suggestions to start reducing the environmental impact of their software.

### Title

The environmental impact of software


## Talk

Hi, I am Christian, I am a software engineer and I love my job.
Most of the time, I am developing something useful and I like to think that I contribute to the progress of humankind.

But today I'd like to speak about a negative point of our industry - its environmental impact.
We are all - you, you and you - responsible for extracting rare metals out of the earth. 
Which leads to soil, water and air pollution.

We also consume a massive amount of water to manufacture and cool down the hardware we use.
And then, we are also responsible for the emission of a lot of green house gas.

It turns out, the digital sectors emissions are higher than those of the aviation industry. 
In fact, they almost match the emissions of the worldwide fleet of trucks.

So we are working in quite a dirty industry, aren't we?
I was wondering what I can to decrease our negative impact - and found a lot of possible measures.
But what I was missing, is their order of magnitude. What does really have an impact?

So I decided to run a simulation of an average software project to figure that out.
I assume a software which is developed during 2 years by a team of 8 engineers working in a near-shoring setup.
After that, for the following 8 years, the software is maintained by 2 engineers and used by 9000 users.

The simulation led to an estimated amount of greenhouse gas emissions of roughly 100t
in the areas we as engineers can directly influence. 

That is the volume of 14'000 fire extinguishers.
And it would require 2 football pitches full of trees to remove the emissions from the atmosphere.

Now, let's reduce these emissions by applying the various measures - ordered by their impact.
First: All engineers are working in the same country and thus avoiding flights, reduces the emissions by 25%

Second: Cutting the cores and the memory used by the VM in half decreases emissions by 15%

Third: Increasing the power usage efficiency in the data center by moving to a hyperscaler 
and profiting from its better emission factor - 8%

Forth: Studies say that 30% of the resources are zombie resources. Let's remove them and gain 7%.

Five: Switching servers off when the application is not used outside of business hours - 8%
Seven: Using a cloud-hosted continuous integration solution instead of our own - 7%

Eight: Using to a green electricity product - 7%
Nine: Increaseing home office from 1 to 3 days - 7%

Ten: Relaxing hot-standby requirements and use an infrastructure as code approach to quickly recover - 1%
Eleven: Reducing the internet traffic by a quarter reduces the emissions by another 5%

You see, we have a lot of possibilities. 
And with all of them combined we were able to reduce the simulated projects emissions by 3 quarters.

Now, you probably can not apply all the measures in your projects.
But even if everybody in this room applies one of the measures we can already save tons of emissions.

So please, reduce the environmental impact of the software you are building 
and let's make sure we can continue to contribute to the progress of human kind
- instead of having to use the fire extinguishers to save us!






