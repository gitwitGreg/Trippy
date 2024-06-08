import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import WeatherForecast from '../components/Weather'


describe('AddActivity', () => {

    it('should create an itinerary and create one activity associated with', () => {

        render(<WeatherForecast lat={34.5} city='Miami'/>);

        screen.debug();

    })

})