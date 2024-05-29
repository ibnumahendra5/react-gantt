import { action, observable, runInAction } from 'mobx'

class SpecialDaysStore {
  @observable specialDays = null

  @action async getSpecialsDay(year) {
    const token = 'Bearer 71|hm1cIqJo5bQ0JgHh1cLIsfD1Zy1An8z3hmTCsbvjd80cefbc'
    const key = 'OR10nI9RXgLYzrPakyfZDVU'
    const config = {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        withCredentials: 'true',
      },
    }

    try {
      const res = await fetch(
        `https://api-staging.constructapp.team/v2/project/tasks/au-holidays/v2?key=${key}&year=${year}`,
        config
      )

      const data = await res.json()

      runInAction(() => {
        this.specialDays = data
      })

      return data
    } catch (error) {
      console.error('Failed to fetch special days:', error)
      return error
    }
  }
}

export const specialDaysStore = new SpecialDaysStore()
